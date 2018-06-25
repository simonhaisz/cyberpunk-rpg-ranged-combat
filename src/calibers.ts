import { Caliber, CaliberType } from "./caliber";


const LightPistol = new Caliber(CaliberType.Pistol, "Light Pistol", 35, 0.5, [500, 350, 250]);
const HeavyPistol = new Caliber(CaliberType.Pistol, "Heavy Pistol", 50, 1, [500, 250]);
const Shotgun = new Caliber(CaliberType.Pistol, "Shotgun", 70, 1, [500]);

const Buckshot = new Caliber(CaliberType.Pistol, "Bucketshot", 25, 0.25, [500]);

const PDW = new Caliber(CaliberType.Rifle, "PDW", 25, 0.5, [1000, 700]);

const LightRifle = new Caliber(CaliberType.Rifle, "Light Rifle", 25, 1, [1000, 700, 250]);
const HeavyRifle = new Caliber(CaliberType.Rifle, "Heavy Rifle", 35, 2, [1000, 250]);
const Cannon = new Caliber(CaliberType.Rifle, "Cannon", 50, 2, [1000, 250]);

const Concussion = new Caliber(CaliberType.Shrapnel, "Concussion", 25, 0.05, [1000, 500]);
const Fragmentation = new Caliber(CaliberType.Shrapnel, "Fragmentation", 25, 0.1, [1000, 500]);

export const Calibers: Caliber[] = [
    LightPistol,
    HeavyPistol,
    Buckshot,
    // Shotgun,
    // PDW,
    LightRifle,
    HeavyRifle,
    // Cannon
    Concussion,
    Fragmentation
];