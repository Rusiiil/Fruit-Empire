export interface Cell {

    x: number;
    y: number;

}

export interface FruitDefinition {

    id: string;

    displayName: string;

    spriteKey: string;

    color: string;

    shape: Cell[];

}