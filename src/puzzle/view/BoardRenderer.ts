import Phaser from "phaser";

import { TILE_SIZE } from "../board/BoardConstants";
import type { Board } from "../board/Board";

export class BoardRenderer {

    public render(
        scene: Phaser.Scene,
        board: Board
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

                fruit.id,

                fruit.x,

                fruit.y

            );

        }

    }

    private drawFruit(
        scene: Phaser.Scene,
        id: string,
        x: number,
        y: number
    ): void {

        let color = 0xffffff;

        switch (id) {

            case "apple":

                color = 0xff4444;

                break;

            case "banana":

                color = 0xffdd33;

                break;

        }

        scene.add.circle(

            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,

            TILE_SIZE * 0.30,

            color

        );

    }

}