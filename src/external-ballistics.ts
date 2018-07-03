import { Caliber } from "./caliber";
import { BallisticsData } from "./ballistics-data";

export class ExternalBallistics {
    readonly caliber: Caliber;
    readonly muzzleVelocity: number;
    private _ballistics: BallisticsData[] = [];

    constructor(caliber: Caliber, muzzleVelocity: number) {
        this.caliber = caliber;
        this.muzzleVelocity = muzzleVelocity;
    }

    calculate() {
       this._ballistics = calcDistanceVelocities(this.caliber, this.muzzleVelocity);
    }

    getDistanceVelocities(): BallisticsData[] {
        return this._ballistics;
    }
}

export const calcExternalBallistics = (caliber: Caliber, muzzleVelocity: number): ExternalBallistics => {
    const externalBallistics = new ExternalBallistics(caliber, muzzleVelocity);
    externalBallistics.calculate();
    return externalBallistics;
};

const calcDistanceVelocities = (caliber: Caliber, muzzleVelocity: number): BallisticsData[] => {
    const ballistics: BallisticsData[] = [];
    ballistics.push(new BallisticsData(0, muzzleVelocity, 0));
    let currentDistance = 0;
    let currentVelocity = muzzleVelocity;
    let currentTime = 0;
    while (true) {
        currentDistance += currentVelocity * t;
        const force = calcForce(currentVelocity, caliber.dragCoefficient, caliber.sectionalArea);
        currentVelocity = calcDecceleration(currentVelocity, force, caliber.mass);
        currentTime += t;
        if (currentVelocity < 10) {
            break;
        }
        ballistics.push(new BallisticsData(currentDistance, currentVelocity, currentTime));
    }
    return ballistics;
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