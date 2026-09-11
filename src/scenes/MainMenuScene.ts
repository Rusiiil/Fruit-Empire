import Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {

    constructor() {
        super("MainMenuScene");
    }

    create() {

        console.log("Main Menu");

        this.add.text(
            640,
            250,
            "Fruit Empire",
            {
                fontSize: "64px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        this.add.text(
            640,
            420,
            "Click to Start",
            {
                fontSize: "32px",
                color: "#ffff00"
            }
        ).setOrigin(0.5);

        this.input.once("pointerdown", () => {

            this.scene.start("PuzzleScene");

        });

    }

}