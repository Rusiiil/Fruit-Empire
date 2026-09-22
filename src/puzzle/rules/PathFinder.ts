import type { Board } from "../board/Board";
import type { BoardFruit } from "../board/BoardFruit";

export class PathFinder {

    private readonly board: Board;

    constructor(board: Board) {

        this.board = board;

    }

    public findLastReachable(
        startX: number,
        startY: number,
        targetX: number,
        targetY: number,
        ignoredFruit: BoardFruit | null
    ): { x: number; y: number } {

        const visited = new Set<string>();

        const queue: { x: number; y: number }[] = [];

        const reachable: { x: number; y: number }[] = [];

        queue.push({

            x: startX,
            y: startY

        });

        visited.add(

            `${startX},${startY}`

        );

        while (queue.length > 0) {

            const current = queue.shift()!;

            reachable.push(current);

            console.log(current);

            const neighbours = this.getNeighbours(

                current.x,
                current.y,
                ignoredFruit

            );

            for (const neighbour of neighbours) {

                const key = `${neighbour.x},${neighbour.y}`;

                if (visited.has(key)) {

                    continue;

                }

                visited.add(key);

                queue.push(neighbour);

            }

        }

        let best = reachable[0];

        let bestDistance = Number.MAX_VALUE;

        for (const cell of reachable) {

            const dx = cell.x - targetX;
            const dy = cell.y - targetY;

            const distance = dx * dx + dy * dy;

            if (distance < bestDistance) {

                bestDistance = distance;
                best = cell;

            }

        }

        return best;

    }

    private getNeighbours(
        x: number,
        y: number,
        ignoredFruit: BoardFruit | null
    ): { x: number; y: number }[] {

        const result: { x: number; y: number }[] = [];

        const directions = [

            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }

        ];

        for (const direction of directions) {

            const nextX = x + direction.x;
            const nextY = y + direction.y;

            if (!this.board.isInside(nextX, nextY)) {

                continue;

            }

            if (this.board.isWall(nextX, nextY)) {

                continue;

            }

            if (

                ignoredFruit !== null &&
                !this.board.canPlace(

                    ignoredFruit,

                    nextX,

                    nextY

                )

            ) {

                continue;

            }

            result.push({

                x: nextX,
                y: nextY

            });

        }

        return result;

    }

}