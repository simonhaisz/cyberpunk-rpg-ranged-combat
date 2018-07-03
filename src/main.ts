import { Calibers } from "./calibers";
import { calcExternalBallistics } from "./external-ballistics";
import { calcArmorPiercing, convertArmorPiercingToRating } from "./terminal-ballistics";

const ranges: number[] = [
    0,
    1,
    2,
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

type ReportValue = {
    distance: number;
    report: string;
};

for (const caliber of Calibers) {
    for (const muzzleVelocity of caliber.muzzleVelocities) {
        const externalBallistics = calcExternalBallistics(caliber, muzzleVelocity);
        console.log(`${caliber.name}: ${muzzleVelocity}`);
        let velocityOverDistance = "[";
        let lastDistance = -1;
        let lastVelocity = Number.MAX_VALUE;
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
            const armorPiercing = calcArmorPiercing(caliber, velocity);
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
            const currentTime = Math.ceil(time * 100) / 100;
            const effectiveArmorPiercing = convertArmorPiercingToRating(rangeArmorPiercing);
            const effectiveTime = Math.ceil(rangeTime * 100) / 100;

            rangeVelocities.push({ distance: currentDistance, report: `${currentVelocity}|${rangeVelocity}` });
            rangeArmorPiercings.push({ distance: currentDistance, report: `${effectiveArmorPiercing}` });
            rangeTimes.push({distance: currentDistance, report: `${currentTime}|${effectiveTime}`});
            lastDistance = currentDistance;
            lastVelocity = currentVelocity;
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

