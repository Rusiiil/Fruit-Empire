import Phaser from "phaser";

import { BoardBuilder } from "../puzzle/board/BoardBuilder";
import type { BoardFruit } from "../puzzle/board/BoardFruit";
import { TILE_SIZE } from "../puzzle/board/BoardConstants";
import { LevelLoader } from "../puzzle/levels/LevelLoader";
import { LevelParser } from "../puzzle/levels/LevelParser";
import { BoardRenderer } from "../puzzle/view/BoardRenderer";

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

            console.log(board.exits);

            console.log("LEVEL EXITS:", level.exits);
            console.log("BOARD EXITS:", board.exits);   

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

            this.input.on(
                "pointerdown",

                (pointer: Phaser.Input.Pointer) => {

                    const x = Math.floor(pointer.x / TILE_SIZE);
                    const y = Math.floor(pointer.y / TILE_SIZE);

                    this.selectedFruit = board.getFruitAt(x, y);

                    draggedFruit = this.selectedFruit;

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

                    const x = Math.floor(pointer.x / TILE_SIZE);
                    const y = Math.floor(pointer.y / TILE_SIZE);

                    if (board.isFree(x, y)) {

                        draggedFruit.x = x;
                        draggedFruit.y = y;

                    }

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