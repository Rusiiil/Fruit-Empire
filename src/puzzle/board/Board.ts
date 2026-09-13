import type { Tile } from "./Tile";

export class Board {

    public readonly width: number;

    public readonly height: number;

    public readonly tiles: Tile[][];

    constructor(
        width: number,
        height: number
    ) {

        this.width = width;

        this.height = height;

        this.tiles = [];

    }

}