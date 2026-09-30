export interface BoardFruit {

    id: string;

    color: string;

    x: number;

    y: number;

    width: number;

    height: number;

    sprite?: Phaser.GameObjects.Arc;

    pixelX: number;

    pixelY: number;

    targetPixelX: number;

    targetPixelY: number;

    isMoving: boolean;

}