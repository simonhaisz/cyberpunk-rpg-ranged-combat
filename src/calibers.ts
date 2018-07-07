import { Caliber, CaliberType } from "./caliber";

const Holdout = new Caliber(CaliberType.Pistol, "Hold-out", 35, 0.25, [500]);
const Handgun = new Caliber(CaliberType.Pistol, "Hand-gun", 35, 0.5, [500]);
const Handcannon = new Caliber(CaliberType.Pistol, "Hand-cannon", 50, 1, [500]);
const Shotgun = new Caliber(CaliberType.Pistol, "Shotgun", 70, 1, [500]);

const Buckshot = new Caliber(CaliberType.Pistol, "Bucketshot", 35, 0.25, [500]);

const Pdw = new Caliber(CaliberType.Rifle, "PDW", 25, 0.5, [1000]);

const SportRifle = new Caliber(CaliberType.Rifle, "Sport-rifle", 25, 1, [1000]);
const SniperRifle = new Caliber(CaliberType.Rifle, "Sniper-rifle", 35, 2, [1000]);
const Cannon = new Caliber(CaliberType.Rifle, "Cannon", 50, 2, [1000]);

const Flechette = new Caliber(CaliberType.Flechette, "Flechette", 12.5, 0.5, [1000, 500]);

const Concussion = new Caliber(CaliberType.Shrapnel, "Concussion", 12.5, 0.125, [1000, 500]);
const Fragmentation = new Caliber(CaliberType.Shrapnel, "Fragmentation", 12.5, 0.25, [1000, 500]);

export const Calibers: Caliber[] = [
    Holdout,
    Handgun,
    Handcannon,
    // Buckshot,
    // Shotgun,
    Flechette,
    Pdw,
    SportRifle,
    SniperRifle,
    Concussion,
    Fragmentation
];