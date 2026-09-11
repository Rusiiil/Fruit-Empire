import Phaser from "phaser";

export class PuzzleScene extends Phaser.Scene {

    constructor() {
        super("PuzzleScene");
    }

    create() {

        console.log("Puzzle Scene");

        this.cameras.main.setBackgroundColor("#6fcf97");

        this.add.text(
            640,
            360,
            "Puzzle Scene",
            {
                fontSize: "42px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

    }

}