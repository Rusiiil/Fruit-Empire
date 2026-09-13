import type { LevelData } from "./LevelData";

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

        // Реализуем в следующем спринте

    }

    private parseExitLine(
        level: LevelData,
        line: string
    ): void {

        // Реализуем позже

    }

    private parseRewardLine(
        level: LevelData,
        line: string
    ): void {

        // Реализуем позже

    }

}