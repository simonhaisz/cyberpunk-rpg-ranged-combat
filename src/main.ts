import { Calibers } from "./calibers";
import { calcExternalBallistics } from "./external-ballistics";
import { calcArmorPiercing, convertArmorPiercingToRating } from "./terminal-ballistics";

const ranges: number[] = [
    0,
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

type Pair = {
    a: number;
    b: string;
};

for (const caliber of Calibers) {
    for (const muzzleVelocity of caliber.muzzleVelocities) {
        const externalBallistics = calcExternalBallistics(caliber, muzzleVelocity);
        console.log(`${caliber.name}: ${muzzleVelocity}`);
        let velocityOverDistance = "[";
        let lastDistance = -1;
        let lastVelocity = Number.MAX_VALUE;
        let nextRangeIndex = 0;
        const distanceVelocities = externalBallistics.getDistanceVelocities();
        const rangeVelocities: Pair[] = [];
        const rangeArmorPiercings: Pair[] = [];
        const currentRangeVelocities: number[] = [];
        const currentRangeArmorPiercies: number[] = [];
        for (const distance of distanceVelocities.keys()) {
            const currentDistance = Math.floor(distance);
            const velocity = <number>distanceVelocities.get(distance);
            const armorPiercing = calcArmorPiercing(caliber, velocity);
            currentRangeVelocities.push(velocity);
            currentRangeArmorPiercies.push(armorPiercing);
            if (currentDistance <= lastDistance) {
                continue;
            }
            if (currentDistance < ranges[nextRangeIndex]) {
                continue;
            }

            const rangeVelocity = Math.floor(currentRangeVelocities.reduce((a, b) => a + b) / currentRangeVelocities.length);
            const rangeArmorPiercing = currentRangeArmorPiercies.reduce((a, b) => a + b) / currentRangeArmorPiercies.length;
            const currentVelocity = Math.ceil(velocity);
            const currentArmorPiercing = convertArmorPiercingToRating(rangeArmorPiercing);

            rangeVelocities.push({ a: currentDistance, b: `${currentVelocity}|${rangeVelocity}` });
            rangeArmorPiercings.push({ a: currentDistance, b: `${currentArmorPiercing}` });
            lastDistance = currentDistance;
            lastVelocity = currentVelocity;
            nextRangeIndex++;
            currentRangeVelocities.length = 0;
            currentRangeArmorPiercies.length = 0;
            if (nextRangeIndex >= ranges.length) {
                break;
            }
        }
        console.log(`[${rangeVelocities.map(rv => `${rv.a}:${rv.b}`).join(", ")}]`);
        console.log(`[${rangeArmorPiercings.map(rv => `${rv.a}:${rv.b}`).join(", ")}]`);
        console.log();
    }
}

