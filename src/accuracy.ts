const ratingMinuteOfAngleMap = new Map<number, number>();
for (let i = 0; i < 12; i++) {
    const moa = Math.sqrt(1600 / Math.pow(2, i));
    ratingMinuteOfAngleMap.set(i + 1, moa);
}

type DistanceThreshold = {
    distance: number;
    threshold: number;
};

const ratingDistanceThresholdsMap = new Map<number, DistanceThreshold[]>();

for (const [rating, moa] of ratingMinuteOfAngleMap.entries()) {
    const distanceThresholds: DistanceThreshold[] = [];
    let previousDistanceThreshold: DistanceThreshold | undefined;
    for (let distance = 1; ; distance++) {
        const threshold = Math.floor(Math.log2(moa * distance / 100 / Math.sqrt(50)) + 5);
        const distanceThreshold = { distance, threshold };
        if (previousDistanceThreshold == undefined || previousDistanceThreshold.threshold < threshold) {
            distanceThresholds.push(distanceThreshold);
        }
        previousDistanceThreshold = distanceThreshold;
        if (threshold > 7) {
            break;
        }
    }
    ratingDistanceThresholdsMap.set(rating, distanceThresholds);
}

for (const [rating, dts] of ratingDistanceThresholdsMap.entries()) {
    console.log(`Accuracy ${rating} (${ratingMinuteOfAngleMap.get(rating)})`);
    console.log(`[${dts.map(dt => `${dt.distance}:${dt.threshold}`).join(", ")}]`);
}