import Phaser from "phaser";

import { TILE_SIZE } from "../board/BoardConstants";
import type { Board } from "../board/Board";
import type { BoardFruit } from "../board/BoardFruit";

export class BoardRenderer {

    public render(

        scene: Phaser.Scene,

        board: Board,

        selectedFruit: BoardFruit | null

    ): void {

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

                    x * TILE_SIZE + TILE_SIZE / 2,

                    y * TILE_SIZE + TILE_SIZE / 2,

                    TILE_SIZE,

                    TILE_SIZE,

                    color

                );

            }

        }

        for (const fruit of board.fruits) {

            this.drawFruit(

                scene,

                fruit,

                fruit === selectedFruit

            );

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

            fruit.x * TILE_SIZE + TILE_SIZE / 2,

            fruit.y * TILE_SIZE + TILE_SIZE / 2,

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