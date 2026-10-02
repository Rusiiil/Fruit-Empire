import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        const fruits = [

            "apple",

            "banana"

        ];

        for (const fruit of fruits) {

            this.load.image(

                fruit,

                `/assets/fruits/${fruit}.png`

            );

        }

        const tiles = [
            "floor",
            "wall_segment",
            "wall_edge",
            "wall"
        ];

        for (const tile of tiles) {

            this.load.image(
                tile,
                `/assets/tiles/${tile}.png`
            );

        }

    }

    create() {

        console.log("Preload Scene");

        this.scene.start("MainMenuScene");

    }

}