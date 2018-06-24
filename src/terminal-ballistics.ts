import { Caliber } from "./caliber";

export const calcArmorPiercing = (caliber: Caliber, velocity: number): number => {
    return Math.sqrt(Math.pow(velocity, 2) * caliber.sectionalDensity) / 100;
}

export const convertArmorPiercingToRating = (armorPiercing: number): number => {
    if (armorPiercing >= 1) {
        return Math.round(armorPiercing);
    }
    return -Math.floor((1 / armorPiercing) - 1);
}