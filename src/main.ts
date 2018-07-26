import { Calibers, ReferenceCalibers } from "./calibers";
import { calcExternalBallistics } from "./external-ballistics";
import { calcArmorPiercing, convertArmorPiercingToRating, PiercingType } from "./terminal-ballistics";
import { CaliberType, Caliber } from "./caliber";

let types: CaliberType[] = [CaliberType.Pistol, CaliberType.Rifle];
let ranges: number[] = [
    20,
    50,
    100,
    200,
    500,
    1000,
    2000,
    5000
]

if (process.argv.length > 2) {
    switch (process.argv[2]) {
        case "bullets":
            break;
        case "flechettes":
        types = [CaliberType.Flechette];
            break;
        case "grenades":
            types = [CaliberType.Shrapnel];
            ranges = [
                0,
                2,
                5,
                10,
                20,
                50
            ]
            break;
    }
}

let apds = false;
let piercing = PiercingType.Ball;
if (process.argv.length > 3) {
    switch (process.argv[3]) {
        case "ap":
            piercing = PiercingType.AP;
            break;
        case "apds":
            piercing = PiercingType.AP;
            apds = true;
            break;
        case "hp":
            piercing = PiercingType.HP;
            break;
    }
}

let calibers = Calibers;
if (process.argv.length > 4) {
    switch(process.argv[4]) {
        case "reference":
            calibers = ReferenceCalibers;
            break;
    }
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
        let nextRangeIndex = 0;
        const ballistics = externalBallistics.getDistanceVelocities();
        const rangeVelocities: ReportValue[] = [];
        const rangeArmorPiercings: ReportValue[] = [];
        const rangeTimes: ReportValue[] = [];
        const currentRangeVelocities: number[] = [];
        const currentRangeArmorPiercies: number[] = [];
        const currentRangeTimes: number[] = [];
        for (const b of ballistics) {
            const currentDistance = Math.floor(b.distance);
            const velocity = b.velocity;
            const time = b.time;
            const armorPiercing = calcArmorPiercing(caliber, velocity, piercing);
            currentRangeVelocities.push(velocity);
            currentRangeArmorPiercies.push(armorPiercing);
            currentRangeTimes.push(time);
            if (currentDistance <= lastDistance) {
                continue;
            }
            if (currentDistance < ranges[nextRangeIndex]) {
                continue;
            }

            const rangeVelocity = Math.floor(currentRangeVelocities.reduce((a, b) => a + b) / currentRangeVelocities.length);
            const rangeArmorPiercing = currentRangeArmorPiercies.reduce((a, b) => a + b) / currentRangeArmorPiercies.length;
            const rangeTime = currentRangeTimes.reduce((a, b) => a + b) / currentRangeTimes.length;
            const currentVelocity = Math.ceil(velocity);
            const currentTime = Math.ceil(time * 1000) / 1000;
            const effectiveArmorPiercing = convertArmorPiercingToRating(rangeArmorPiercing);
            const effectiveTime = Math.ceil(rangeTime * 1000) / 1000;

            rangeVelocities.push({ distance: currentDistance, report: `${currentVelocity}|${rangeVelocity}` });
            rangeArmorPiercings.push({ distance: currentDistance, report: `${effectiveArmorPiercing}` });
            rangeTimes.push({distance: currentDistance, report: `${currentTime}|${effectiveTime}`});
            lastDistance = currentDistance;
            nextRangeIndex++;
            currentRangeVelocities.length = 0;
            currentRangeArmorPiercies.length = 0;
            if (nextRangeIndex >= ranges.length) {
                break;
            }
        }
        console.log(`[${rangeVelocities.map(rv => `${rv.distance}:${rv.report}`).join(", ")}]`);
        console.log(`[${rangeArmorPiercings.map(rv => `${rv.distance}:${rv.report}`).join(", ")}]`);
        console.log(`[${rangeTimes.map(rv => `${rv.distance}:${rv.report}`).join(", ")}]`);
        console.log();
    }
}

