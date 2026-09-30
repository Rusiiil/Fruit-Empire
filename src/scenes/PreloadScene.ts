import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.image(

            "apple",

            "/assets/fruits/apple.png"

        );

        this.load.image(

            "banana",

            "/assets/fruits/banana.png"

        );

    }

    create() {

        console.log("Preload Scene");

        this.scene.start("MainMenuScene");

    }

}