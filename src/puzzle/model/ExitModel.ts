export type ExitSide =
    | "top"
    | "bottom"
    | "left"
    | "right";

export class ExitModel {

    public color: string;
    public side: ExitSide;
    public start: number;
    public length: number;

    constructor(
        color: string,
        side: ExitSide,
        start: number,
        length: number
    ) {
        this.color = color;
        this.side = side;
        this.start = start;
        this.length = length;
    }

}