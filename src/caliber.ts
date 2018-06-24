export enum CaliberType {
    Shrapnel,
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
        this.dragCoefficient = type == CaliberType.Rifle ? 1 : 5;
        this.sectionalArea = Math.pow(convertInchesToMeters(size / 100) / 2, 2) * Math.PI;
    }
}

const calcMuzzleVelocities = (maxMuzzleVelocity: number): number[] => {
    return [
        maxMuzzleVelocity,
        Math.floor(maxMuzzleVelocity / Math.sqrt(2)),
        250
    ];
};

const calcMass = (size: number, sectionalDensity: number): number => {
    return Math.pow(convertInchesToMeters(size / 100), 2) * sectionalDensity;
}

const convertInchesToMeters = (inches: number): number => {
    return inches * 0.0254
}