import type { FruitDefinition } from "../definitions/FruitDefinition";

export class FruitModel {

    public id: number;
    public definition: FruitDefinition;
    public gridX: number;
    public gridY: number;

    constructor(
        id: number,
        definition: FruitDefinition,
        gridX: number,
        gridY: number
    ) {
        this.id = id;
        this.definition = definition;
        this.gridX = gridX;
        this.gridY = gridY;
    }

}