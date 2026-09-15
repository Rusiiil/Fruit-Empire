import { Board } from "./Board";
import type { LevelData } from "../levels/LevelData";
import type { Tile } from "./Tile";

export class BoardBuilder {

    public build(level: LevelData): Board {

        const height = level.map.rows.length;
        const width = level.map.rows[0].length;

        const board = new Board(width, height);

        board.exits.push(...level.exits);

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

                    case ".":

                        row.push({
                            type: "floor"
                        });

                        break;

                    default:

                        row.push({
                            type: "floor"
                        });

                        this.addFruit(
                            board,
                            level,
                            symbol,
                            x,
                            y
                        );

                        break;

                }

            }

            board.tiles.push(row);

        }

        return board;

    }

    private addFruit(
        board: Board,
        level: LevelData,
        symbol: string,
        x: number,
        y: number
    ): void {

        const definition = level.fruits.find(

            fruit => fruit.symbol === symbol

        );

        if (definition === undefined) {

            console.warn(

                `Fruit '${symbol}' not found.`

            );

            return;

        }

        board.fruits.push({

            id: definition.id,

            color: definition.color,

            x: x,

            y: y

        });

    }

}