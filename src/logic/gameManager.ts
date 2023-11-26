import * as SQLite from "expo-sqlite";

let db = SQLite.openDatabase("games.db");

export type GameResults = {
  bpm: number;
  avgDistBetweenBeats: number;
  stdDev: number;
  accuracyPercent?: number;
};

export type Game = {
  startTime: Date;
  results: number[];
};

export function saveGame(results: number[]) {
  let game: Game = {
    startTime: new Date(),
    results: results,
  };

  let gameString = JSON.stringify(game);

  db.transaction((tx) => {
    // create table if not exists
    tx.executeSql(
      "create table if not exists games (id integer primary key not null, game text);"
    );

    tx.executeSql(
      "insert into games (game) values (?)",
      [gameString],
      (_, { rows }) => console.log("Game saved"),
      // @ts-expect-error
      (_, error) => console.log("Error saving game: ", error)
    );

    tx.executeSql("select * from games", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  });
}

export function getLastGame() {
  return new Promise<Game>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from games order by id desc limit 1",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(JSON.parse(rows.item(0).game));
          } else {
            reject("No game found");
          }
        },
        // @ts-expect-error
        (_, error) => reject(error)
      );
    });
  });
}


