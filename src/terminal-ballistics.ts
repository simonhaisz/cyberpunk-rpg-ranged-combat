import { Caliber } from "./caliber";

export enum PiercingType {
    Ball,
    AP,
}

const STANDARD = 100;
const ARMOR_PIERCING = 100 / Math.sqrt(2);
export const calcArmorPiercing = (caliber: Caliber, velocity: number, type: PiercingType): number => {
    let density: number;
    switch (type) {
        case PiercingType.Ball:
            density = STANDARD;
            break;
        case PiercingType.AP:
            density = ARMOR_PIERCING;
            break;
        default:
            throw new Error(`Unknown type ${type}`);
    }
    return Math.sqrt(Math.pow(velocity, 2) * caliber.sectionalDensity) / density;
}

export const convertArmorPiercingToRating = (armorPiercing: number): number => {
    if (armorPiercing >= 1) {
        return Math.round(armorPiercing);
    }
    return -Math.floor((1 / armorPiercing) - 1);
}