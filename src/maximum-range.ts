
const ranges: number[] = [
    5,
    10,
    20,
    50,
    100,
    200,
    500,
    1000,
    2000,
    5000
];

const SPLIT_COUNT = 3;

for (let i = 0; i < ranges.length - 1; i++) {
    const start = ranges[i];
    const end = ranges[i+1];

    const splits: number[] = [];
    let previous = start;
    for (let j = 0; j < SPLIT_COUNT - 1; j++) {
        const delta = end - previous;
        previous += delta / 2;
        splits.push(previous);
    }
    splits.push(end);

    console.log(`${start}: [${splits.join(", ")}]`);
}