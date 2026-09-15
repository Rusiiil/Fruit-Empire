import type { Tile } from "./Tile";
import type { BoardFruit } from "./BoardFruit";
import type { LevelExit } from "../levels/LevelExit";

export class Board {

    public readonly width: number;

    public readonly height: number;

    public readonly tiles: Tile[][];

    public readonly fruits: BoardFruit[];

    public readonly exits: LevelExit[];

    constructor(
        width: number,
        height: number
    ) {

        this.width = width;

        this.height = height;

        this.tiles = [];

        this.fruits = [];

        this.exits = [];

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

    public isInside(
        x: number,
        y: number
    ): boolean {

        return (
            x >= 0 &&
            y >= 0 &&
            x < this.width &&
            y < this.height
        );

    }

    public isWall(
        x: number,
        y: number
    ): boolean {

        return this.tiles[y][x].type === "wall";

    }

    public isFree(
        x: number,
        y: number
    ): boolean {

        if (!this.isInside(x, y)) {

            return false;

        }

        if (this.isWall(x, y)) {

            return false;

        }

        return this.getFruitAt(x, y) === null;

    }

}