import type { LevelData } from "./LevelData";
import type { LevelFruit } from "./LevelFruit";
import type { LevelExit } from "./LevelExit";

export class LevelParser {

    public parse(text: string): LevelData {

        const lines = text.split(/\r?\n/);

        const level: LevelData = {

            name: "",

            map: {
                rows: []
            },

            fruits: [],

            exits: [],

            reward: 0

        };

        let currentSection = "";

        for (const line of lines) {

            const trimmed = line.trim();

            // Пропускаем пустые строки
            if (trimmed === "") {

                continue;

            }

            // Название уровня
            if (trimmed.startsWith("NAME:")) {

                level.name = trimmed.substring(5).trim();

                continue;

            }

            // Начало новой секции
            if (trimmed.startsWith("[") && trimmed.endsWith("]")) {

                currentSection = trimmed;

                console.log("SECTION:", currentSection);

                continue;

            }

            // Передаем строку нужному обработчику
            switch (currentSection) {

                case "[MAP]":

                    this.parseMapLine(level, trimmed);

                    break;

                case "[FRUITS]":

                    this.parseFruitLine(level, trimmed);

                    break;

                case "[EXITS]":

                    this.parseExitLine(level, trimmed);

                    break;

                case "[REWARD]":

                    this.parseRewardLine(level, trimmed);

                    break;

            }

        }

        console.log(level);

        return level;

    }

    private parseMapLine(
        level: LevelData,
        line: string
    ): void {

        level.map.rows.push(line);

    }

    private parseFruitLine(
        level: LevelData,
        line: string
    ): void {
        console.log("Fruit line:", line);

        const parts = line.split(/\s+/);

        if (parts.length !== 3) {

            console.warn("Invalid fruit:", line);

            return;

        }

        const fruit: LevelFruit = {

            symbol: parts[0],

            id: parts[1],

            color: parts[2]

        };

        level.fruits.push(fruit);

    }

    private parseExitLine(
        level: LevelData,
        line: string
    ): void {

        const parts = line.split(/\s+/);

        if (parts.length !== 4) {

            console.warn("Invalid exit:", line);

            return;

        }

        const exit: LevelExit = {

            color: parts[0],

            side: parts[1] as "left" | "right" | "top" | "bottom",

            x: Number(parts[2]),

            y: Number(parts[3])

        };

        level.exits.push(exit);

    }

    private parseRewardLine(
        level: LevelData,
        line: string    
    ): void {

        const parts = line.split(/\s+/);

        if (parts.length !== 2) {

            console.warn("Invalid reward:", line);

            return;

        }

        if (parts[0] !== "coins") {

            console.warn("Unknown reward type:", parts[0]);

            return;

        }

        level.reward = Number(parts[1]);

    }

}