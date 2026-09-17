import Phaser from "phaser";

import {
    TILE_SIZE,
    BOARD_OFFSET_X,
    BOARD_OFFSET_Y
} from "../board/BoardConstants";

import type { Board } from "../board/Board";
import type { BoardFruit } from "../board/BoardFruit";

export class BoardRenderer {

    public render(

        scene: Phaser.Scene,

        board: Board,

        selectedFruit: BoardFruit | null

    ): void {

        // Поле
        for (let y = 0; y < board.height; y++) {

            for (let x = 0; x < board.width; x++) {

                const tile = board.tiles[y][x];

                let color = 0xffffff;

                switch (tile.type) {

                    case "wall":

                        color = 0x555555;

                        break;

                    case "floor":

                        color = 0x88cc88;

                        break;

                }

                scene.add.rectangle(

                    BOARD_OFFSET_X + x * TILE_SIZE + TILE_SIZE / 2,

                    BOARD_OFFSET_Y + y * TILE_SIZE + TILE_SIZE / 2,

                    TILE_SIZE,

                    TILE_SIZE,

                    color

                );

            }

        }

        // Выходы
        for (const exit of board.exits) {

            this.drawExit(

                scene,

                exit,

                board

            );

        }

        // Фрукты
        for (const fruit of board.fruits) {

            this.drawFruit(

                scene,

                fruit,

                fruit === selectedFruit

            );

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

        let color = 0xffffff;

        switch (fruit.id) {

            case "apple":

                color = 0xff4444;

                break;

            case "banana":

                color = 0xffdd33;

                break;

        }

        const circle = scene.add.circle(

            BOARD_OFFSET_X + fruit.x * TILE_SIZE + TILE_SIZE / 2,

            BOARD_OFFSET_Y + fruit.y * TILE_SIZE + TILE_SIZE / 2,

            TILE_SIZE * 0.30,

            color

        );

        fruit.sprite = circle;

        if (selected) {

            circle.setStrokeStyle(

                4,

                0xffffff

            );

        }

    }

}