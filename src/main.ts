import { Command } from "commander";
import { Calibers, ReferenceCalibers } from "./calibers";
import { calcExternalBallistics } from "./external-ballistics";
import { calcArmorPiercing, convertArmorPiercingToRating, PiercingType } from "./terminal-ballistics";
import { Caliber, CaliberType } from "./caliber";
import { writeFile } from "./file-util";

const program = new Command();
program
    .option("-t, --type <type>", "Specify type (bullets, flechetts, grenades)", /^(bullets|flechettes|grenades)$/i, "bullets")
    .option("-p, --piercing <piercing>", "Specify piercing (fmj, tap, du, hp, gel)", /^(fmg|tap|du|hp|gel)$/i, "fmj")
    .option("-c, --calibers <calibers>", "Specify calibers (game, reference)", /^(game|reference)$/i, "game")
    .option("-r, --ranges <ranges>", "Specify ranges (game, reference)", /^(game|reference)$/, "game")
    .option("-f, --output-file", "Output results to a file in addition to console", false);
program.parse(process.argv);

let gameRanges: number[] = [
    5,
    10,
    20,
    50,
    100,
    200,
    500,
    1000,
    2000,
    5000
];

for (let i = 0; i < gameRanges.length - 1; i++) {
    const currentRange = gameRanges[i];
    const nextRange = gameRanges[i+1];
    // once we get to 100 pad out the ranges to include every instance of 100
    if (nextRange - currentRange > 100) {
        gameRanges.splice(i+1, 0, currentRange + 100);
    }
}

let referenceRanges: number[] = [];
for (let i = 1; i < 500; i++) {
    referenceRanges.push(i * 10);
}

let types: CaliberType[] = [CaliberType.Pistol, CaliberType.Rifle];

switch (program.type.toLowerCase()) {
    case "bullets":
        break;
    case "flechettes":
        types = [CaliberType.Flechette];
        break;
    case "grenades":
        types = [CaliberType.Shrapnel];
        gameRanges = [
            0,
            2,
            5,
            10,
            20,
            50
        ]
        break;
    default:
        throw new Error(`Unknown 'type': ${program.type}`);
}

let apds = false;
let piercing: PiercingType;
switch (program.piercing.toLowerCase()) {
    case "fmj":
        piercing = PiercingType.FMJ;
        break;
    case "tap":
        piercing = PiercingType.TAP;
        break;
    case "du":
        piercing = PiercingType.DU;
        break;
    case "hp":
        piercing = PiercingType.HP;
        break;
    case "gel":
        piercing = PiercingType.GEL;
        break;
    default:
        throw new Error(`Unknown 'piercing': ${program.piercing}`);
}

let calibers: Caliber[];
switch (program.calibers.toLowerCase()) {
    case "game":
        calibers = Calibers;
        break;
    case "reference":
        calibers = ReferenceCalibers;
        break;
    default:
        throw new Error(`Unknown 'calibers': ${program.calibers}`);
}

let ranges: number[];
switch (program.ranges.toLowerCase()) {
    case "game":
        ranges = gameRanges;
        break;
    case "reference":
        ranges = referenceRanges;
        break;
    default:
        throw new Error(`Unknown 'ranges': ${program.ranges}`);
}

const outputFile: boolean = program.outputFile;
const outputFiles = new Map<string,string[]>();
if (outputFile) {
    outputFiles.set("velocity", []);
    outputFiles.set("ap", []);
    outputFiles.set("time", []);
}

type ReportValue = {
    distance: number;
    report: string;
};

for (let caliber of calibers) {
    if (types.indexOf(caliber.type) === -1) {
        continue;
    }
    if (apds) {
        caliber = caliber.createApds();
    }
    for (const muzzleVelocity of caliber.muzzleVelocities) {
        const externalBallistics = calcExternalBallistics(caliber, muzzleVelocity);
        console.log(`${caliber.name}: ${muzzleVelocity}`);
        let lastDistance = -1;
        const ballistics = externalBallistics.getDistanceVelocities();
        const velocities: number[] = [];
        const armorPiercings: number[] = [];
        const times: number[] = [];
        const drifts: number[] = [];

        const rangeVelocities: ReportValue[] = [];
        const rangeArmorPiercingRatings: ReportValue[] = [];
        const rangeTimes: ReportValue[] = [];
        const rangeDrifts: ReportValue[] = [];

        for (const b of ballistics) {
            const currentDistance = Math.floor(b.distance);
            const velocity = round(b.velocity, 50, true);
            const time = round(b.time, 0.1, false);
            const drift = round(Math.pow(b.time, 2), 0.1, false);
            const armorPiercing = convertArmorPiercingToRating(calcArmorPiercing(caliber, velocity, piercing));
            if (velocity < 200) {
                break;
            }
            if (currentDistance <= lastDistance) {
                continue;
            }

            if (addIfDifferent(velocities, velocity)) {
                rangeVelocities.push({distance: currentDistance, report: `${velocity}`});
            }
            if (addIfDifferent(armorPiercings, armorPiercing)) {
                rangeArmorPiercingRatings.push({ distance: currentDistance, report: `${armorPiercing}`});
            }
            if (addIfDifferent(times, time)) {
                rangeTimes.push({ distance: currentDistance, report: `${time.toFixed(2)}`});
            }
            if (addIfDifferent(drifts, drift)) {
                rangeDrifts.push({ distance: currentDistance, report: `${drift.toFixed(2)}`});
            }
        }
        console.log(`V   [${rangeVelocities.map(rv => `${rv.distance}:${rv.report}`).join(", ")}]`);
        //console.log(`AP# [${rangeArmorPiercings.map(rv => `${rv.distance}:${rv.report}`).join(", ")}]`);
        console.log(`APR [${rangeArmorPiercingRatings.map(ra => `${ra.distance}:${ra.report}`).join(", ")}]`);
        console.log(`T   [${rangeTimes.map(rt => `${rt.distance}:${rt.report}`).join(", ")}]`);
        // console.log(`D   [${rangeDrifts.map(rd => `${rd.distance}:${rd.report}`).join(", ")}]`);
        console.log();

        if (outputFile) {
            outputFiles.get("velocity")!.push(`${caliber.name}\t${velocities.map(v => v.toFixed(2)).join("\t")}`);
            outputFiles.get("ap")!.push(`${caliber.name}\t${armorPiercings.map(ap => ap.toFixed(2)).join("\t")}`);
            outputFiles.get("time")!.push(`${caliber.name}\t${times.map(t => t.toFixed(2)).join("\t")}`);
        }
    }
}

if (outputFile) {
    for (const [name, rows] of outputFiles) {
        writeFile(`${name}.tab`, rows);
    }
}

function addIfDifferent(values: number[], newValue: number): boolean {
    if (values.length === 0 || values[values.length - 1] !== newValue) {
        values.push(newValue);
        return true;
    }
    return false;
}

function round(value: number, factor: number, roundUp: boolean): number {
    if (roundUp) {
        return Math.ceil(value / factor) * factor;
    } else {
        return Math.floor(value / factor) * factor;
    }
}