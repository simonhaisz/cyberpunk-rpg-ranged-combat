import { Caliber } from "./caliber";

export class ExternalBallistics {
    readonly caliber: Caliber;
    readonly muzzleVelocity: number;
    private _distanceVelocities = new Map<number, number>();

    constructor(caliber: Caliber, muzzleVelocity: number) {
        this.caliber = caliber;
        this.muzzleVelocity = muzzleVelocity;
    }

    calculate() {
       this._distanceVelocities = calcDistanceVelocities(this.caliber, this.muzzleVelocity);
    }

    getDistanceVelocities(): Map<number,number> {
        return new Map<number,number>(this._distanceVelocities);
    }
}

export const calcExternalBallistics = (caliber: Caliber, muzzleVelocity: number): ExternalBallistics => {
    const externalBallistics = new ExternalBallistics(caliber, muzzleVelocity);
    externalBallistics.calculate();
    return externalBallistics;
};

const calcDistanceVelocities = (caliber: Caliber, muzzleVelocity: number): Map<number,number> => {
    const distanceVelocities = new Map<number,number>();
    let currentDistance = 0;
    let currentVelocity = muzzleVelocity;
    distanceVelocities.set(currentDistance, currentVelocity);
    while (true) {
        currentDistance += currentVelocity * t;
        const force = calcForce(currentVelocity, caliber.dragCoefficient, caliber.sectionalArea);
        currentVelocity = calcDecceleration(currentVelocity, force, caliber.mass);
        if (currentVelocity < 10) {
            break;
        }
        distanceVelocities.set(currentDistance, currentVelocity);
    }

    return distanceVelocities;
}

const p = 0.003;
const calcForce = (velocity: number, dragCoefficient: number, crossSectionalArea: number): number => {
    return 0.5 * p * Math.pow(velocity, 2) * dragCoefficient * crossSectionalArea;
};

const t = 0.001;
const calcDecceleration = (velocity: number, force: number, mass: number): number => {
    const a = force / mass;
    return velocity - a * t;
}