import { LevelManager } from "./LevelManager";

export class LevelController {

    private readonly levelManager = new LevelManager();

    public getLevelPath(): string {

        return this.levelManager.getCurrentPath();

    }

    public nextLevel(): void {

        this.levelManager.nextLevel();

    }

}