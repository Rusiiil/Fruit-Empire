import Phaser from "phaser";


import { LevelLoader } from "../puzzle/levels/LevelLoader";
import { LevelParser } from "../puzzle/levels/LevelParser";

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

        const parser = new LevelParser();

        const level = parser.parse(text);

        console.log(level);

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