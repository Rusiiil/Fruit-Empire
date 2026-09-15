import Phaser from "phaser";

import { BoardBuilder } from "../puzzle/board/BoardBuilder";
import { LevelLoader } from "../puzzle/levels/LevelLoader";
import { LevelParser } from "../puzzle/levels/LevelParser";
import { TEST } from "../puzzle/board/BoardBuilder";
import { BoardRenderer } from "../puzzle/view/BoardRenderer.ts";
import { TILE_SIZE } from "../puzzle/board/BoardConstants";

console.log(TEST);
export class PuzzleScene extends Phaser.Scene {

    constructor() {
        super("PuzzleScene");
    }

    async create() {

    try {

        console.log("1");

        const loader = new LevelLoader();

        console.log("2");

        const text = await loader.load("/levels/level001.txt");

        console.log("3");

        console.log(text);

        const parser = new LevelParser();

        const level = parser.parse(text);

        const builder = new BoardBuilder();

        const board = builder.build(level);

        this.input.on(
            "pointerdown",
            (pointer: Phaser.Input.Pointer) => {

                const x = Math.floor(pointer.x / TILE_SIZE);
                const y = Math.floor(pointer.y / TILE_SIZE);

                console.log("Cell:", x, y);

                console.log(board.getFruitAt(x, y));

            }
        );

        const renderer = new BoardRenderer();

        renderer.render(this, board);

        console.log(board);

        console.log(

            board.getFruitAt(1, 1)

        );

        console.log(

            board.getFruitAt(5, 2)

        );

        console.log(

            board.getFruitAt(0, 0)

        );

        console.log(level);

    }
    catch (error) {

        console.error(error);

    }

    this.cameras.main.setBackgroundColor("#6fcf97");

    // this.add.text(
    //     640,
    //     360,
    //     "Puzzle Scene",
    //     {
    //         fontSize: "42px",
    //         color: "#ffffff"
    //     }
    // ).setOrigin(0.5);

}

}