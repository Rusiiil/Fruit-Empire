import type { LevelMap } from "./LevelMap";
import type { LevelFruit } from "./LevelFruit";
import type { LevelExit } from "./LevelExit";

export interface LevelData {

    name: string;

    map: LevelMap;

    fruits: LevelFruit[];

    exits: LevelExit[];

    reward: number;

}