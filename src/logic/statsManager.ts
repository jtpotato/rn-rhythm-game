import { GameResults } from "./gameManager";
import { analyseResults } from "./analyseResults";
import * as SQLite from "expo-sqlite";

let db = SQLite.openDatabase("games.db");

export function saveStats(results: number[]) {
    const gameStats = analyseResults(results);

    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists statsv3 (id integer primary key not null, bpm real, avgDistBetweenBeats real, stdDev real, accuracyPercent real);"
        );

        tx.executeSql(
            "insert into statsv3 (bpm, avgDistBetweenBeats, stdDev, accuracyPercent) values (?, ?, ?, ?)",
            [gameStats.bpm, gameStats.avgDistBetweenBeats, gameStats.stdDev, gameStats.accuracyPercent],
            (_, { rows }) => console.log("Stats saved"),
            // @ts-expect-error
            (_, error) => console.log("Error saving stats: ", error)
        );
    });
}

export function getStats() {
    return new Promise<GameResults[]>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "select * from statsv3",
                [],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        resolve(rows._array);
                    } else {
                        reject("No stats found");
                    }
                },
            );
        });
    });
}
