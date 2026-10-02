import Phaser from "phaser";

import {
    TILE_SIZE,
    BOARD_OFFSET_X,
    BOARD_OFFSET_Y
} from "../board/BoardConstants";

import type { Board } from "../board/Board";
import type { BoardFruit } from "../board/BoardFruit";

export class BoardRenderer {
    private fruitsCreated = false;

    private boardCreated = false;

    private fruitSprites = new Map<
        BoardFruit,
        Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle
    >();

    private boardLayer!: Phaser.GameObjects.Container;

    private fruitLayer!: Phaser.GameObjects.Container;

    //private uiLayer!: Phaser.GameObjects.Container;

    public createLayers(
        scene: Phaser.Scene
    ): void {

        this.boardLayer = scene.add.container();

        this.fruitLayer = scene.add.container();

        //this.uiLayer = scene.add.container();

    }

    public render(

        scene: Phaser.Scene,

        board: Board,

        selectedFruit: BoardFruit | null

    ): void {

        if (!this.boardCreated) {

            this.drawBoard(scene, board);

            this.boardCreated = true;

        }

        if (!this.fruitsCreated) {

            for (const fruit of board.fruits) {

                this.drawFruit(
                    scene,
                    fruit,
                    fruit === selectedFruit
                );

            }

            this.fruitsCreated = true;

        }

    }

    private drawBoard(
        scene: Phaser.Scene,
        board: Board
    ): void {

        for (let y = 0; y < board.height; y++) {
            for (let x = 0; x < board.width; x++) {

                const tile = board.tiles[y][x];

                if (tile.type === "floor") {

                    const floor = scene.add.image(
                        BOARD_OFFSET_X +
                        x * TILE_SIZE +
                        TILE_SIZE / 2,

                        BOARD_OFFSET_Y +
                        y * TILE_SIZE +
                        TILE_SIZE / 2,

                        "floor"
                    );

                    floor.setDisplaySize(
                        TILE_SIZE,
                        TILE_SIZE
                    );

                    floor.setDepth(0);

                    this.boardLayer.add(floor);

                    continue;
                }

                if (tile.type === "wall") {

                    const isTop = y === 0;
                    const isBottom = y === board.height - 1;
                    const isLeft = x === 0;
                    const isRight = x === board.width - 1;

                    const pixelX =
                        BOARD_OFFSET_X +
                        x * TILE_SIZE +
                        TILE_SIZE / 2;

                    const pixelY =
                        BOARD_OFFSET_Y +
                        y * TILE_SIZE +
                        TILE_SIZE / 2;

                    // Углы
                    if (
                        (isTop || isBottom) &&
                        (isLeft || isRight)
                    ) {
                        const edge = scene.add.image(
                            pixelX,
                            pixelY,
                            "wall_edge"
                        );

                        edge.setDisplaySize(
                            TILE_SIZE,
                            TILE_SIZE
                        );

                        // edge.png = левый верхний угол
                        if (isTop && isLeft) {
                            edge.setAngle(0);
                        }
                        else if (isTop && isRight) {
                            edge.setAngle(90);
                        }
                        else if (isBottom && isRight) {
                            edge.setAngle(180);
                        }
                        else if (isBottom && isLeft) {
                            edge.setAngle(270);
                        }

                        edge.setDepth(1);

                        this.boardLayer.add(edge);

                        continue;
                    }

                    // Обычный горизонтальный участок стены
                    const wall = scene.add.image(
                        pixelX,
                        pixelY,
                        "wall_segment"
                    );

                    wall.setDisplaySize(
                        TILE_SIZE,
                        TILE_SIZE
                    );

                    // Боковые стены
                    if (!isTop && !isBottom) {
                        wall.setAngle(270);

                        if (isRight) {
                            wall.setFlipY(true);
                        }
                    }

                    // Нижняя стена
                    if (isBottom) {
                        wall.setFlipY(true);
                    }

                    wall.setDepth(0);

                    this.boardLayer.add(wall);
                }
            }
        }

        for (const exit of board.exits) {
            this.drawExit(scene, exit, board);
        }
    }

    private drawExit(

        scene: Phaser.Scene,

        exit: {

            color: string;

            side: string;

            index: number;

        },

        board: Board

    ): void {

        let color = 0xffffff;

        switch (exit.color) {

            case "red":

                color = 0xff4444;
                break;

            case "yellow":

                color = 0xffdd33;
                break;

        }

        const graphics = scene.add.graphics();

        this.boardLayer.add(graphics);

        graphics.setDepth(5);

        graphics.fillStyle(color);

        switch (exit.side) {

            case "left":

                graphics.fillTriangle(

                    BOARD_OFFSET_X + 6,

                    BOARD_OFFSET_Y + exit.index * TILE_SIZE + TILE_SIZE / 2,

                    BOARD_OFFSET_X + 22,

                    BOARD_OFFSET_Y + exit.index * TILE_SIZE + 16,

                    BOARD_OFFSET_X + 22,

                    BOARD_OFFSET_Y + exit.index * TILE_SIZE + TILE_SIZE - 16

                );

                break;

            case "right":

                graphics.fillTriangle(

                    BOARD_OFFSET_X + board.width * TILE_SIZE - 6,

                    BOARD_OFFSET_Y + exit.index * TILE_SIZE + TILE_SIZE / 2,

                    BOARD_OFFSET_X + board.width * TILE_SIZE - 22,

                    BOARD_OFFSET_Y + exit.index * TILE_SIZE + 16,

                    BOARD_OFFSET_X + board.width * TILE_SIZE - 22,

                    BOARD_OFFSET_Y + exit.index * TILE_SIZE + TILE_SIZE - 16

                );

                break;

            case "top":

                graphics.fillTriangle(

                    BOARD_OFFSET_X + exit.index * TILE_SIZE + TILE_SIZE / 2,

                    BOARD_OFFSET_Y + 6,

                    BOARD_OFFSET_X + exit.index * TILE_SIZE + 16,

                    BOARD_OFFSET_Y + 22,

                    BOARD_OFFSET_X + exit.index * TILE_SIZE + TILE_SIZE - 16,

                    BOARD_OFFSET_Y + 22

                );

                break;

            case "bottom":

                graphics.fillTriangle(

                    BOARD_OFFSET_X + exit.index * TILE_SIZE + TILE_SIZE / 2,

                    BOARD_OFFSET_Y + board.height * TILE_SIZE - 6,

                    BOARD_OFFSET_X + exit.index * TILE_SIZE + 16,

                    BOARD_OFFSET_Y + board.height * TILE_SIZE - 22,

                    BOARD_OFFSET_X + exit.index * TILE_SIZE + TILE_SIZE - 16,

                    BOARD_OFFSET_Y + board.height * TILE_SIZE - 22

                );

                break;

        }

    }

    private drawFruit(

        scene: Phaser.Scene,

        fruit: BoardFruit,

        selected: boolean

    ): void {

        const width = fruit.width * TILE_SIZE * 0.8;

        const height = fruit.height * TILE_SIZE * 0.8;

        console.log(

            fruit.id,

            scene.textures.exists(fruit.id)

        );

        const texture = scene.textures.get(fruit.id);

        if (texture.key !== "__MISSING") {

            const image = scene.add.image(

                fruit.pixelX +
                (fruit.width - 1) * TILE_SIZE / 2,

                fruit.pixelY +
                (fruit.height - 1) * TILE_SIZE / 2,

                fruit.id

            );

            image.setDisplaySize(

                width,

                height

            );

            image.setDepth(10);

            this.fruitLayer.add(image);

            this.fruitSprites.set(

                fruit,

                image

            );

            return;

        }

        let color = 0xffffff;

        switch (fruit.id) {

            case "banana":

                color = 0xffdd33;

                break;

        }

        const rectangle = scene.add.rectangle(

            fruit.pixelX +
            (fruit.width - 1) * TILE_SIZE / 2,

            fruit.pixelY +
            (fruit.height - 1) * TILE_SIZE / 2,

            width,

            height,

            color

        );

        rectangle.setDepth(10);

        this.fruitLayer.add(rectangle);

        this.fruitSprites.set(

            fruit,

            rectangle

        );

        if (selected) {

            rectangle.setStrokeStyle(

                4,

                0xffffff

            );

        }

    }

    public updateFruit(
        fruit: BoardFruit
    ): void {

        const sprite = this.fruitSprites.get(fruit);

        if (!sprite) {

            return;

        }

        sprite.setPosition(

            fruit.pixelX,

            fruit.pixelY

        );

    }

    public removeFruit(
        fruit: BoardFruit
    ): void {

        const sprite = this.fruitSprites.get(fruit);

        if (!sprite) {

            return;

        }

        sprite.destroy();

        this.fruitSprites.delete(fruit);

    }

}