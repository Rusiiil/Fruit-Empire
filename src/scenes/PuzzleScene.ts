import Phaser from "phaser";

import { BoardBuilder } from "../puzzle/board/BoardBuilder";
import type { BoardFruit } from "../puzzle/board/BoardFruit";
import {
    TILE_SIZE,
    BOARD_OFFSET_X,
    BOARD_OFFSET_Y
} from "../puzzle/board/BoardConstants";
import { LevelLoader } from "../puzzle/levels/LevelLoader";
import { LevelParser } from "../puzzle/levels/LevelParser";
import { BoardRenderer } from "../puzzle/view/BoardRenderer";
import { PathFinder } from "../puzzle/rules/PathFinder";
import { Board } from "../puzzle/board/Board";

export class PuzzleScene extends Phaser.Scene {

    private selectedFruit: BoardFruit | null = null;

    constructor() {

        super("PuzzleScene");

    }

    async create() {

        try {

            const loader = new LevelLoader();

            const text = await loader.load("/levels/level001.txt");

            const parser = new LevelParser();

            const level = parser.parse(text);

            const builder = new BoardBuilder();

            const board = builder.build(level);
            
            const renderer = new BoardRenderer();

            let draggedFruit: BoardFruit | null = null;

            const redraw = () => {

                this.children.removeAll();

                renderer.render(

                    this,

                    board,

                    this.selectedFruit

                );

            };

            redraw();

            let startX = 0;
            let startY = 0;

            let lastCellX = -1;
            let lastCellY = -1;

            this.input.on(

                "pointerdown",

                (pointer: Phaser.Input.Pointer) => {

                const x = Math.floor(
                    (pointer.x - BOARD_OFFSET_X) / TILE_SIZE
                );

                const y = Math.floor(
                    (pointer.y - BOARD_OFFSET_Y) / TILE_SIZE
                );

                    this.selectedFruit = board.getFruitCovering(x, y);

                    draggedFruit = this.selectedFruit;

                    if (draggedFruit !== null) {

                        startX = draggedFruit.x;
                        startY = draggedFruit.y;
                        lastCellX = startX;
                        lastCellY = startY;

                    }

                    redraw();

                }

            );

            this.input.on(

                "pointermove",

                (pointer: Phaser.Input.Pointer) => {

                    if (!draggedFruit) {

                        return;

                    }

                    const targetX = Math.floor(
                        (pointer.x - BOARD_OFFSET_X) / TILE_SIZE
                    );

                    const targetY = Math.floor(
                        (pointer.y - BOARD_OFFSET_Y) / TILE_SIZE
                    );

                    if (

                        targetX === lastCellX &&
                        targetY === lastCellY

                    ) {

                        return;

                    }

                    lastCellX = targetX;
                    lastCellY = targetY;

                    this.moveFruit(

                        board,

                        draggedFruit,

                        startX,
                        startY,

                        targetX,
                        targetY

                    );

                    redraw();

                }

            );

            this.input.on(

                "pointerup",

                (pointer: Phaser.Input.Pointer) => {

                    if (!draggedFruit) {

                        return;

                    }

                    const targetX = Math.floor(
                        (pointer.x - BOARD_OFFSET_X) / TILE_SIZE
                    );

                    const targetY = Math.floor(
                        (pointer.y - BOARD_OFFSET_Y) / TILE_SIZE
                    );

                    this.moveFruit(

                        board,

                        draggedFruit,

                        startX,
                        startY,

                        targetX,
                        targetY

                    );

                    draggedFruit = null;

                    redraw();

                }

            );

        }

        catch (error) {

            console.error(error);

        }

        this.cameras.main.setBackgroundColor("#6fcf97");

    }

    private moveFruit(

        board: Board,

        fruit: BoardFruit,

        startX: number,

        startY: number,

        targetX: number,

        targetY: number

    ): void {

        const pathFinder = new PathFinder(board);

        const result = pathFinder.findLastReachable(

            startX,
            startY,

            targetX,
            targetY,

            fruit

        );

        fruit.x = result.x;
        fruit.y = result.y;

        board.tryExit(fruit);

    }

}