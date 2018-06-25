import { Caliber } from "./caliber";

const STANDARD = 100;
const ARMOR_PIERCING = 100 / Math.sqrt(2);
export const calcArmorPiercing = (caliber: Caliber, velocity: number): number => {
    return Math.sqrt(Math.pow(velocity, 2) * caliber.sectionalDensity) / STANDARD;
}

export const convertArmorPiercingToRating = (armorPiercing: number): number => {
    if (armorPiercing >= 1) {
        return Math.round(armorPiercing);
    }
    return -Math.floor((1 / armorPiercing) - 1);
}