export class LevelManager {

    private currentLevel = 1;

    public getCurrentLevel(): number {

        return this.currentLevel;

    }

    public nextLevel(): void {

        this.currentLevel++;

    }

    public getCurrentPath(): string {

        return `/levels/level${this.currentLevel
            .toString()
            .padStart(3, "0")}.txt`;

    }

}