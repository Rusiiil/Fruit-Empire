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

    public getExitAt(
        x: number,
        y: number
    ): LevelExit | null {

        for (const exit of this.exits) {

            switch (exit.side) {

                case "left":

                    if (
                        x === -1 &&
                        y === exit.index
                    ) {

                        return exit;

                    }

                    break;

                case "right":

                    if (
                        x === this.width &&
                        y === exit.index
                    ) {

                        return exit;

                    }

                    break;

                case "top":

                    if (
                        x === exit.index &&
                        y === -1
                    ) {

                        return exit;

                    }

                    break;

                case "bottom":

                    if (
                        x === exit.index &&
                        y === this.height
                    ) {

                        return exit;

                    }

                    break;

            }

        }

        return null;

    }

    public removeFruit(
        fruit: BoardFruit
    ): void {

        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {

            this.fruits.splice(index, 1);

        }

    }

    public tryExit(
        fruit: BoardFruit
    ): boolean {

        console.log("Fruit:", fruit.x, fruit.y, fruit.color);//////убрать

        for (const exit of this.exits) {

            if (exit.color !== fruit.color) {

                continue;

            }
            console.log("Exit:", exit.side, exit.index, exit.color);//////убрать

            switch (exit.side) {

                case "left":

                    if (
                        fruit.x === 1 &&
                        fruit.y === exit.index
                    ) {
                        console.log("REMOVE");//////убрать

                        this.removeFruit(fruit);

                        return true;

                    }

                    break;

                case "right":

                    if (
                        fruit.x === this.width - 2 &&
                        fruit.y === exit.index
                    ) {

                        console.log("REMOVE");

                        this.removeFruit(fruit);

                        return true;

                    }

                    break;

                case "top":

                    if (
                        fruit.y === 1 &&
                        fruit.x === exit.index
                    ) {

                        this.removeFruit(fruit);

                        return true;

                    }

                    break;

                case "bottom":

                    if (
                        fruit.y === this.height - 2 &&
                        fruit.x === exit.index
                    ) {

                        this.removeFruit(fruit);

                        return true;

                    }

                    break;

            }

        }

        return false;

    }

    public canPlace(
        fruit: BoardFruit,
        x: number,
        y: number
    ): boolean {

        for (let dy = 0; dy < fruit.height; dy++) {

            for (let dx = 0; dx < fruit.width; dx++) {

                const cellX = x + dx;
                const cellY = y + dy;

                if (!this.isInside(cellX, cellY)) {

                    return false;

                }

                if (this.isWall(cellX, cellY)) {

                    return false;

                }

                const other = this.getFruitCovering(
                    cellX,
                    cellY
                );

                if (

                    other !== null &&
                    other !== fruit

                ) {

                    return false;

                }

            }

        }

        return true;

    }

    public getFruitCovering(
        x: number,
        y: number
    ): BoardFruit | null {

        for (const fruit of this.fruits) {

            if (

                x >= fruit.x &&
                x < fruit.x + fruit.width &&
                y >= fruit.y &&
                y < fruit.y + fruit.height

            ) {

                return fruit;

            }

        }

        return null;

    }
    
    public isCompleted(): boolean {

        return this.fruits.length === 0;

    }

}