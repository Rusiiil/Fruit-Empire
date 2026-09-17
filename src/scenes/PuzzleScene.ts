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

            this.input.on(

                "pointerdown",

                (pointer: Phaser.Input.Pointer) => {

                const x = Math.floor(
                    (pointer.x - BOARD_OFFSET_X) / TILE_SIZE
                );

                const y = Math.floor(
                    (pointer.y - BOARD_OFFSET_Y) / TILE_SIZE
                );

                    this.selectedFruit = board.getFruitAt(x, y);

                    draggedFruit = this.selectedFruit;

                    if (draggedFruit !== null) {

                        startX = draggedFruit.x;
                        startY = draggedFruit.y;

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

                    draggedFruit.sprite?.setPosition(

                        pointer.x,

                        pointer.y

                    );

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

                    const pathFinder = new PathFinder(board);

                    const result = pathFinder.findLastReachable(
                        startX,
                        startY,
                        targetX,
                        targetY,
                        draggedFruit
                    );

                    draggedFruit.x = result.x;
                    draggedFruit.y = result.y;

                    board.tryExit(draggedFruit);

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

}