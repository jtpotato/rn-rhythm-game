import { GameResults } from "./gameManager";
import { analyseResults } from "./analyseResults";
import * as SQLite from "expo-sqlite";

let db = SQLite.openDatabase("games.db");

export function saveStats(results: number[]) {
    const gameStats = analyseResults(results);

    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists stats (id integer primary key not null, bpm real, avgDistBetweenBeats real, stdDev real);"
        );

        tx.executeSql(
            "insert into stats (bpm, avgDistBetweenBeats, stdDev) values (?, ?, ?)",
            [gameStats.bpm, gameStats.avgDistBetweenBeats, gameStats.stdDev],
            (_, { rows }) => console.log("Stats saved"),
            // @ts-expect-error
            (_, error) => console.log("Error saving stats: ", error)
        );
    });
}

export function getStats() {
    return new Promise<GameResults>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "select * from stats",
                [],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        resolve({
                            bpm: rows.item(0).bpm,
                            avgDistBetweenBeats: rows.item(0).avgDistBetweenBeats,
                            stdDev: rows.item(0).stdDev,
                        });
                    } else {
                        reject("No stats found");
                    }
                },
                // @ts-expect-error
                (_, error) => reject(error)
            );
        });
    });
}
