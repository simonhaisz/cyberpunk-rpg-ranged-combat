export enum CaliberType {
    Pistol,
    Rifle
}

export class Caliber {
    readonly type: CaliberType;
    readonly name: string;
    readonly size: number;
    readonly sectionalDensity: number;
    readonly mass: number;
    readonly maxMuzzleVelocity: number;
    readonly muzzleVelocities: number[];
    readonly dragCoefficient: number;
    readonly sectionalArea: number;

    constructor(type: CaliberType, name: string, size: number, sectionalDensity: number, maxMuzzleVelocity: number) {
        this.type = type;
        this.name = name;
        this.size = size;
        this.sectionalDensity = sectionalDensity;
        this.mass = calcMass(size, sectionalDensity);
        this.maxMuzzleVelocity = maxMuzzleVelocity;
        this.muzzleVelocities = calcMuzzleVelocities(maxMuzzleVelocity);
        this.dragCoefficient = type == CaliberType.Rifle ? 1 : 0.5;
        this.sectionalArea = (convertInchesToMeters(size / 100) / 2) ^ 2 * Math.PI;
    }
}

const calcMuzzleVelocities = (maxMuzzleVelocity: number): number[] => {
    const muzzleVelocities: number[] = [maxMuzzleVelocity];
    let currentVelocity = maxMuzzleVelocity;
    for (let i = 0; i < 2; i++) {
        currentVelocity = currentVelocity / Math.sqrt(2);
        muzzleVelocities.push(Math.floor(currentVelocity));
    }
    if (muzzleVelocities.indexOf(250) === -1) {
        muzzleVelocities.push(250);
    }
    return muzzleVelocities;
};

const calcMass = (size: number, sectionalDensity: number): number => {
    return (convertInchesToMeters(size / 100)) ^ 2 * sectionalDensity;
}

const convertInchesToMeters = (inches: number): number => {
    return inches * 0.0254
}