import Phaser from "phaser";

export interface BoardFruit {

    id: string;

    color: string;

    x: number;

    y: number;

    sprite?: Phaser.GameObjects.Arc;

}