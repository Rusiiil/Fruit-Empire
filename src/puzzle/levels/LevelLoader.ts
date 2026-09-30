export class LevelLoader {

    public async load(path: string): Promise<string> {

        const response = await fetch(path);

        if (!response.ok) {

            throw new Error(

                `Level file not found: ${path}`

            );

        }

        const text = await response.text();

        if (

            text.startsWith("<!doctype html") ||
            text.startsWith("<html")

        ) {

            throw new Error(

                `Invalid level file: ${path}`

            );

        }

        return text;

    }

}