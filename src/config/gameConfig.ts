import Phaser from "phaser";

console.log("gameConfig loaded");

import { BootScene } from "../scenes/BootScene";
import { PreloadScene } from "../scenes/PreloadScene";
import { MainMenuScene } from "../scenes/MainMenuScene";
import { PuzzleScene } from "../scenes/PuzzleScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {

    type: Phaser.AUTO,

    width: 1280,

    height: 720,

    backgroundColor: "#74b9ff",

    parent: "game",

    scene: [
        BootScene,
        PreloadScene,
        MainMenuScene,
        PuzzleScene
    ]

};