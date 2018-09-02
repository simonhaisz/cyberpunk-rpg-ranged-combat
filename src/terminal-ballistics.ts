import { Caliber } from "./caliber";

export enum PiercingType {
    HP,
    FMJ,
    TP,
    DU
}

const HOLLOW_POINT = 200;
const FULL_METAL_JACKET = 100;
const TUNGSTEN_PENERATOR = 100 / Math.sqrt(2);
const DEPLETED_URANIUM = 50;
export const calcArmorPiercing = (caliber: Caliber, velocity: number, type: PiercingType): number => {
    let density: number;
    switch (type) {
        case PiercingType.HP:
            density = HOLLOW_POINT;
            break;
        case PiercingType.FMJ:
            density = FULL_METAL_JACKET;
            break;
        case PiercingType.TP:
            density = TUNGSTEN_PENERATOR;
            break;
        case PiercingType.DU:
            density = DEPLETED_URANIUM;
            break;
        default:
            throw new Error(`Unknown type ${type}`);
    }
    return velocity * caliber.sectionalDensity / density / 2;
}

export const convertArmorPiercingToRating = (armorPiercing: number): number => {
    if (armorPiercing >= 1) {
        return Math.round(armorPiercing);
    }
    return -Math.floor((1 / armorPiercing) - 1);
}