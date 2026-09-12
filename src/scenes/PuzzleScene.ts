import Phaser from "phaser";

import { LevelLoader } from "../puzzle/levels/LevelLoader";
console.log("HELLO FROM NEW PUZZLE SCENE");
export class PuzzleScene extends Phaser.Scene {

    constructor() {
        super("PuzzleScene");
    }

    async create() {

    try {

        console.log("1");

        const loader = new LevelLoader();

        console.log("2");

        const text = await loader.load("/levels/level001.txt");

        console.log("3");

        console.log(text);

    }
    catch (error) {

        console.error(error);

    }

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