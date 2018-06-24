import { Caliber, CaliberType } from "./caliber";

const LightPistol = new Caliber(CaliberType.Pistol, "Light Pistol", 35, 0.5, 500);
const HeavyPistol = new Caliber(CaliberType.Pistol, "Heavy Pistol", 50, 1, 500);
const Shotgun = new Caliber(CaliberType.Pistol, "Shotgun", 70, 1, 500);

const PDW = new Caliber(CaliberType.Rifle, "PDW", 25, 0.5, 1000);

const LightRifle = new Caliber(CaliberType.Rifle, "Light Rifle", 25, 1, 1000);
const HeavyRifle = new Caliber(CaliberType.Rifle, "Heavy Rifle", 35, 2, 1000);
const Cannon = new Caliber(CaliberType.Rifle, "Cannon", 50, 2, 1000);

export const Calibers: Caliber[] = [
    LightPistol,
    HeavyPistol,
    // Shotgun,
    // PDW,
    LightRifle,
    HeavyRifle,
    // Cannon
];