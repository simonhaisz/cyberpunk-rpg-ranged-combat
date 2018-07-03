export class BallisticsData {
    readonly distance: number;
    readonly velocity: number;
    readonly time: number;

    constructor(distance: number, velocity: number, time: number) {
        this.distance = distance;
        this.velocity = velocity;
        this.time = time;
    }
}