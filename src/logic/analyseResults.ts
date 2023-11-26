import { GameResults } from "./gameManager";

export function calculateDiffs(results: number[]): number[] {
    // Calculate the differences between each time
    let differences = [];
    for (let i = 0; i < results.length - 1; i++) {
        differences.push(results[i + 1] - results[i]);
    }

    return differences;
}


export function analyseResults(results: number[]) {
    const differences = calculateDiffs(results);

    console.log("Diffs: ", differences);

    // Find average diff:
    let averageDiff = differences.reduce((a, b) => a + b, 0) / differences.length;

    console.log("Average diff: ", averageDiff);
    console.log("Average BPM: ", msToBPM(averageDiff));

    // Find standard deviation of diffs:
    let variation = differences.map((diff) => Math.pow(diff - averageDiff, 2));
    let avgVariation = variation.reduce((a, b) => a + b, 0) / variation.length;
    let stdDev = Math.sqrt(avgVariation);

    console.log("Standard deviation: ", stdDev);

    let accuracyPercent = 1 - (stdDev / averageDiff);

    return {
        bpm: msToBPM(averageDiff),
        avgDistBetweenBeats: averageDiff,
        stdDev: stdDev,
        accuracyPercent: accuracyPercent
    } as GameResults;
}

function msToBPM(ms: number) {
    return 60000 / ms;
}
