export class LevelLoader {

    public async load(path: string): Promise<string> {

        const response = await fetch(path);

        return await response.text();

    }

}