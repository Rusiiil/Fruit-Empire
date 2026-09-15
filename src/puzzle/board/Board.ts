import type { Tile } from "./Tile";
import type { BoardFruit } from "./BoardFruit";

export class Board {

    public readonly width: number;

    public readonly height: number;

    public readonly tiles: Tile[][];

    public readonly fruits: BoardFruit[];

    constructor(
        width: number,
        height: number
    ) {

        this.width = width;

        this.height = height;

        this.tiles = [];

        this.fruits = [];

    }

    public getFruitAt(
        x: number,
        y: number
    ) {

        for (const fruit of this.fruits) {

            if (

                fruit.x === x &&
                fruit.y === y

            ) {

                return fruit;

            }

        }

        return null;

    }

}