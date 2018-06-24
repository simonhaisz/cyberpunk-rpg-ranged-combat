import { Calibers } from "./calibers";
import { calcExternalBallistics } from "./external-ballistics";
import { calcArmorPiercing } from "./terminal-ballistics";

const ranges: number[] = [
    0,
    10,
    20,
    50,
    100,
    200,
    500,
    1000,
    2000
];

type Pair = {
    a: number;
    b: number;
};

for (const caliber of Calibers) {
    const muzzleVelocity = caliber.maxMuzzleVelocity;
    const externalBallistics = calcExternalBallistics(caliber, caliber.maxMuzzleVelocity);
    console.log(`${caliber.name}: ${muzzleVelocity}`);
    let velocityOverDistance = "[";
    let lastDistance = -1;
    let lastVelocity = Number.MAX_VALUE;
    let nextRangeIndex = 0;
    const distanceVelocities = externalBallistics.getDistanceVelocities();
    const rangeVelocities: Pair[] = [];
    const rangeArmorPiercings: Pair[] = [];
    for (const distance of distanceVelocities.keys()) {
        const currentDistance = Math.floor(distance);
        if (currentDistance <= lastDistance) {
            continue;
        }
        if (currentDistance < ranges[nextRangeIndex]) {
            continue;
        }
        const velocity = <number>distanceVelocities.get(distance);
        const currentVelocity = Math.ceil(velocity);
        const currentArmorPiercing = calcArmorPiercing(caliber, currentVelocity);
        rangeVelocities.push({ a: currentDistance, b: currentVelocity });
        rangeArmorPiercings.push({ a: currentDistance, b: currentArmorPiercing });
        lastDistance = currentDistance;
        lastVelocity = currentVelocity;
        nextRangeIndex++;
        if (nextRangeIndex >= ranges.length) {
            break;
        }
    }
    console.log(`[${rangeVelocities.map(rv => `${rv.a}:${rv.b}`).join(", ")}]`);
    console.log(`[${rangeArmorPiercings.map(rv => `${rv.a}:${rv.b}`).join(", ")}]`);
    console.log();
}

