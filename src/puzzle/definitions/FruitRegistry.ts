import type { FruitDefinition } from "./FruitDefinition";

export class FruitRegistry {

    private definitions = new Map<string, FruitDefinition>();

    public register(definition: FruitDefinition): void {

        this.definitions.set(definition.id, definition);

    }

    public get(id: string): FruitDefinition {

        const definition = this.definitions.get(id);

        if (!definition) {

            throw new Error(`Fruit "${id}" not found`);

        }

        return definition;

    }

}