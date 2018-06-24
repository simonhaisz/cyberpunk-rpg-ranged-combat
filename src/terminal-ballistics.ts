import { Caliber } from "./caliber";

export const calcArmorPiercing = (caliber: Caliber, velocity: number): number => {
    return velocity * caliber.sectionalDensity / 100;
}