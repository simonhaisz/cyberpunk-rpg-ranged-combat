
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
    const delta = end - start;
    splits.push(start + delta / 3, start + delta * 2 / 3, end);

    console.log(`${start}: [${splits.join(", ")}]`);
}