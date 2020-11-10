import { Caliber, CaliberType } from "./caliber";

const ONE_THOUSAND = 1000;
const EIGHT_HUNDRED_SIXTY = ONE_THOUSAND / Math.sqrt(4/3);
const SEVEN_HUNDRED = ONE_THOUSAND / Math.sqrt(2);
const FIVE_HUNDRED = 500;
const FOUR_HUNDRED_THIRTY = 500 / Math.sqrt(4/3);
const THREE_HUNDED_FIFTY = FIVE_HUNDRED / Math.sqrt(2);
const THREE_HUNDRED = FIVE_HUNDRED / Math.sqrt(8/3);
const TWO_HUNDRED_FIFTY = FIVE_HUNDRED / Math.sqrt(4);

const Handgun = new Caliber(CaliberType.Pistol, "Hand-gun", 40, 0.707, [FIVE_HUNDRED]);
const Handcannon = new Caliber(CaliberType.Pistol, "Hand-cannon", 50, 1, [FIVE_HUNDRED]);

const LightRifle = new Caliber(CaliberType.Rifle, "Light Rifle", 20, 0.707, [ONE_THOUSAND]);
const HeavyRifle = new Caliber(CaliberType.Rifle, "Heavy Rifle", 30, 1, [ONE_THOUSAND]);

const LightCannon = new Caliber(CaliberType.Rifle, "Light Cannon", 40, 1.41, [ONE_THOUSAND]);
const HeavyCannon = new Caliber(CaliberType.Rifle, "Heavy Cannon", 50, 2, [ONE_THOUSAND]);

const Buckshot = new Caliber(CaliberType.Pistol, "Buckshot", 35, 0.25, [FIVE_HUNDRED]);
const Flechette = new Caliber(CaliberType.Flechette, "Flechette", 10, 0.25, [ONE_THOUSAND, FIVE_HUNDRED]);

const Concussion = new Caliber(CaliberType.Shrapnel, "Concussion", 12.5, 0.125, [ONE_THOUSAND, FIVE_HUNDRED]);
const Fragmentation = new Caliber(CaliberType.Shrapnel, "Fragmentation", 12.5, 0.25, [ONE_THOUSAND, FIVE_HUNDRED]);

const TwentyTwo = new Caliber(CaliberType.Pistol, "22", 22.3, 0.52, [370]);
const ThreeEighty = new Caliber(CaliberType.Pistol, "380", 3.55, 0.52, [300]);
const Nine = new Caliber(CaliberType.Pistol, "9mm", 35.5, 0.63, [380]);
const FortyFive = new Caliber(CaliberType.Pistol, "45", 45, 0.74, [290]);
const ThreeFiftySeven = new Caliber(CaliberType.Pistol, "357", 3.57, 0.63, [440]);
const FortyFour = new Caliber(CaliberType.Pistol, "44", 42.9, 0.85, [450]);
const FiftyAE = new Caliber(CaliberType.Pistol, "50AE", 50, 0.76, [470]);
const FiveSeven = new Caliber(CaliberType.Rifle, "FiveseveN", 22.4, 0.4, [720]);
const SevenSixTwo_ThreeNine = new Caliber(CaliberType.Rifle, "7.62mmx39", 30, 0.89, [740]);
const FiveFiveSix = new Caliber(CaliberType.Rifle, "5.56mm", 22.4, 0.8, [950]);
const SevenSixTwo_FiveOne = new Caliber(CaliberType.Rifle, "7.62mmx51", 30, 1.1, [830]);
const ThreeThreeEight = new Caliber(CaliberType.Rifle, "338", 33.8, 1.42, [910]);
const FiftyBMG = new Caliber(CaliberType.Rifle, "50BMG", 51, 1.6, [930]);

export const Calibers: Caliber[] = [
    Handgun,
    Handcannon,
    LightRifle,
    HeavyRifle,
    LightCannon,
    HeavyCannon,
    Buckshot,
    Flechette,
    Concussion,
    Fragmentation,
];

export const ReferenceCalibers: Caliber[] = [
    TwentyTwo,
    ThreeEighty,
    Nine,
    FortyFive,
    ThreeFiftySeven,
    FortyFour,
    FiftyAE,
    FiveSeven,
    SevenSixTwo_ThreeNine,
    FiveFiveSix,
    SevenSixTwo_FiveOne,
    ThreeThreeEight,
    FiftyBMG
];