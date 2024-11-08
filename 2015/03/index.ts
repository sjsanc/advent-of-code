import Solution from "../solution";

class Position {
    x: number = 0;
    y: number = 0;

    move(dir: string): void {
        switch (dir) {
            case "v":
                this.y += 1;
                break;
            case "^":
                this.y -= 1;
                break;
            case ">":
                this.x += 1;
                break;
            case "<":
                this.x -= 1;
                break;
        }
    }

    toKey(): string {
        return `${this.x},${this.y}`;
    }
}

class Day03 extends Solution {
    constructor() {
        super("03");
    }

    partOne() {
        return this.chars.reduce(
            (acc, val) => {
                acc.position.move(val);
                const key = acc.position.toKey();
                acc.houses.set(key, (acc.houses.get(key) || 0) + 1);
                return acc;
            },
            {
                houses: new Map<string, number>([['0,0', 1]]),
                position: new Position()
            }
        ).houses.size;
    }

    partTwo() {
        return this.chars.reduce((acc, val, idx) => {
            const pos = (idx % 2 === 0 ? acc.santa : acc.roboSanta);
            pos.move(val);
            acc.houses.set(pos.toKey(), (acc.houses.get(pos.toKey()) || 0) + 1);
            return acc;
        },
            {
                houses: new Map<string, number>([['0,0', 1]]),
                santa: new Position(),
                roboSanta: new Position()
            }).houses.size
    }
}

export default new Day03();
