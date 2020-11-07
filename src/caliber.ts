export enum CaliberType {
    Shrapnel,
    Flechette,
    Pistol,
    Rifle
}

export class Caliber {
    readonly type: CaliberType;
    readonly name: string;
    readonly size: number;
    readonly sectionalDensity: number;
    readonly mass: number;
    readonly muzzleVelocities: number[];
    readonly dragCoefficient: number;
    readonly sectionalArea: number;

    constructor(type: CaliberType, name: string, size: number, sectionalDensity: number, muzzleVelocities: number[]) {
        this.type = type;
        this.name = name;
        this.size = size;
        this.sectionalDensity = sectionalDensity;
        this.mass = calcMass(size, sectionalDensity);
        this.muzzleVelocities = muzzleVelocities;
        this.dragCoefficient = getDragCoefficient(type);
        this.sectionalArea = Math.pow(convertInchesToMeters(size / 100) / 2, 2) * Math.PI;
    }

    createApds(): Caliber {
        return new Caliber(this.type, `${this.name} (APDS)`, this.size / 2, this.sectionalDensity * 2, this.muzzleVelocities.map(v => v * Math.sqrt(2)));
    }
}

const getDragCoefficient = (caliberType: CaliberType): number => {
    switch (caliberType) {
        case CaliberType.Rifle:
            return 1;
        case CaliberType.Pistol:
            return 2;
        case CaliberType.Flechette:
            return 2;
        case CaliberType.Shrapnel:
            return 10;
        default:
            throw new Error(`Unknown caliber type ${caliberType}`);
    }
}

const calcMass = (size: number, sectionalDensity: number): number => {
    return Math.pow(convertInchesToMeters(size / 100), 2) * sectionalDensity;
}

const convertInchesToMeters = (inches: number): number => {
    return inches * 0.0254
}