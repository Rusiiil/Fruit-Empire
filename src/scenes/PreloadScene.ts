import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

    }

    create() {

        console.log("Preload Scene");

        this.scene.start("MainMenuScene");

    }

}