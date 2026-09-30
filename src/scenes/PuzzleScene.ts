import Phaser from "phaser";
import { LevelManager } from "../puzzle/levels/LevelManager";
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

    private pathFinder!: PathFinder;

    private board!: Board;

    private boardRenderer!: BoardRenderer;

    private levelManager = new LevelManager();

    private levelCompleted = false;

    constructor() {

        super("PuzzleScene");

    }

    async create() {

        try {

            await this.loadLevel();

            let draggedFruit: BoardFruit | null = null;

            const redraw = () => {

                if (this.levelCompleted) {

                    return;

                }

                this.boardRenderer.render(

                    this,

                    this.board,

                    this.selectedFruit

                );

            };

            let startX = 0;
            let startY = 0;

            let lastCellX = -1;
            let lastCellY = -1;

            this.input.on(

                "pointerdown",

                (pointer: Phaser.Input.Pointer) => {

                    if (this.levelCompleted) {

                        return;

                    }

                    const x = Math.floor(
                        (pointer.x - BOARD_OFFSET_X) / TILE_SIZE
                    );

                    const y = Math.floor(
                        (pointer.y - BOARD_OFFSET_Y) / TILE_SIZE
                    );

                    this.selectedFruit = this.board.getFruitCovering(x, y);

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

                    if (this.levelCompleted) {

                        return;

                    }

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

                    const oldX = draggedFruit.x;
                    const oldY = draggedFruit.y;

                    this.moveFruit(

                        this.board,

                        draggedFruit,

                        startX,
                        startY,

                        targetX,
                        targetY

                    );

                    if (

                        draggedFruit.x !== oldX ||
                        draggedFruit.y !== oldY

                    ) {

                        startX = draggedFruit.x;
                        startY = draggedFruit.y;

                    }

                }

            );

            this.input.on(

                "pointerup",

                () => {

                    if (this.levelCompleted) {
                        return;
                    }

                    if (!draggedFruit) {
                        return;
                    }

                    draggedFruit = null;
                }

            );

        }

        catch (error) {

            console.error(error);

        }

        this.cameras.main.setBackgroundColor("#6fcf97");

    }

    private async loadLevel(): Promise<void> {

        const loader = new LevelLoader();

        const text = await loader.load(

            this.levelManager.getCurrentPath()

        );

        console.log(this.levelManager.getCurrentPath());
            console.log(text);

        const parser = new LevelParser();

        const level = parser.parse(text);

        const builder = new BoardBuilder();

        this.board = builder.build(level);

        this.pathFinder = new PathFinder(this.board);

        this.boardRenderer = new BoardRenderer();

        this.boardRenderer.createLayers(this);

        this.boardRenderer.render(

            this,

            this.board,

            this.selectedFruit

        );

    }

    private moveFruit(

        board: Board,

        fruit: BoardFruit,

        startX: number,

        startY: number,

        targetX: number,

        targetY: number

    ): void {
        const result = this.pathFinder.findLastReachable(
            startX,
            startY,
            targetX,
            targetY,
            fruit
        );

        fruit.x = result.x;
        fruit.y = result.y;

        fruit.targetPixelX =
            BOARD_OFFSET_X +
            fruit.x * TILE_SIZE +
            TILE_SIZE / 2;

        fruit.targetPixelY =
            BOARD_OFFSET_Y +
            fruit.y * TILE_SIZE +
            TILE_SIZE / 2;

        fruit.isMoving = true;

        const removed = board.tryExit(fruit);

        if (removed) {

            this.boardRenderer.removeFruit(fruit);

        }

        if (board.isCompleted()) {

            this.completeLevel();

        }

    }

    private async completeLevel(): Promise<void> {

        this.levelCompleted = true;

        this.add.text(

            this.cameras.main.centerX,

            this.cameras.main.centerY,

            "LEVEL COMPLETE",

            {

                fontSize: "48px",

                color: "#ffffff"

            }

        ).setOrigin(0.5);

                await new Promise<void>((resolve) => {

            this.time.delayedCall(

                1000,

                () => resolve()

            );

        });

        this.levelManager.nextLevel();

        await this.loadLevel();

    }

    public update(): void {

            if (!this.board) {

                return;

            }

        for (const fruit of this.board.fruits) {

            if (!fruit.isMoving) {

                continue;

            }

            const speed = 12;

            fruit.pixelX += (fruit.targetPixelX - fruit.pixelX) / speed;
            fruit.pixelY += (fruit.targetPixelY - fruit.pixelY) / speed;

            if (

                Math.abs(fruit.pixelX - fruit.targetPixelX) < 1 &&
                Math.abs(fruit.pixelY - fruit.targetPixelY) < 1

            ) {

                fruit.pixelX = fruit.targetPixelX;
                fruit.pixelY = fruit.targetPixelY;

                fruit.isMoving = false;

            }

            this.boardRenderer.updateFruit(fruit);

        }

    }

}