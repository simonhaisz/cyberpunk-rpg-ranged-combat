import { Caliber, CaliberType } from "./caliber";

const Holdout = new Caliber(CaliberType.Pistol, "Holdout", 35, 0.25, [500]);
const Handgun = new Caliber(CaliberType.Pistol, "Handgun", 35, 0.5, [500]);
const Handcannon = new Caliber(CaliberType.Pistol, "Handcannon", 50, 1, [500]);
const Shotgun = new Caliber(CaliberType.Pistol, "Shotgun", 70, 1, [500]);

const Buckshot = new Caliber(CaliberType.Pistol, "Bucketshot", 35, 0.25, [500]);

const PDW = new Caliber(CaliberType.Rifle, "PDW", 25, 0.5, [1000]);

const Rifle = new Caliber(CaliberType.Rifle, "Rifle", 25, 1, [1000]);
const Cannon = new Caliber(CaliberType.Rifle, "Cannon", 50, 2, [1000]);

const Concussion = new Caliber(CaliberType.Shrapnel, "Concussion", 12.5, 0.125, [1000, 500]);
const Fragmentation = new Caliber(CaliberType.Shrapnel, "Fragmentation", 12.5, 0.25, [1000, 500]);

export const Calibers: Caliber[] = [
    Holdout,
    Handgun,
    Handcannon,
    // Buckshot,
    // Shotgun,
    PDW,
    Rifle,
    Cannon,
    Concussion,
    Fragmentation
];