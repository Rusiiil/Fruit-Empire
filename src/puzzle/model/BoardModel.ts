import { ExitModel } from "./ExitModel";
import { FruitModel } from "./FruitModel";

export class BoardModel {

    public width = 0;

    public height = 0;

    public walls: boolean[][] = [];

    public fruits: FruitModel[] = [];

    public exits: ExitModel[] = [];

}