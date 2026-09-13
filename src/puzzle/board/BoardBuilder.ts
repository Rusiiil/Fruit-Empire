import { Board } from "./Board";
import type { LevelData } from "../levels/LevelData";
import type { Tile } from "./Tile";

export class BoardBuilder {

    public build(level: LevelData): Board {

        const height = level.map.rows.length;
        const width = level.map.rows[0].length;

        const board = new Board(width, height);

        for (let y = 0; y < height; y++) {

            const row: Tile[] = [];

            for (let x = 0; x < width; x++) {

                const symbol = level.map.rows[y][x];

                switch (symbol) {

                    case "#":

                        row.push({
                            type: "wall"
                        });

                        break;

                    default:

                        row.push({
                            type: "floor"
                        });

                        break;

                }

            }

            board.tiles.push(row);

        }

        return board;

    }

}

export const TEST = 123;