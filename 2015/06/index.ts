import Solution from "../solution";

class Day06 extends Solution {
    constructor() {
        super("06");
    }

    parse(str: string): { cmd: string; range: [[number, number], [number, number]] } | null {
        const match = /(turn (on|off)|toggle) (\d+),(\d+) through (\d+),(\d+)/.exec(str);
        if (!match) return null;
        const cmd = match[2] !== undefined ? match[2] : "toggle";
        const range: [[number, number], [number, number]] = [
            [parseInt(match[3]), parseInt(match[4])],
            [parseInt(match[5]), parseInt(match[6])]
        ];
        return { cmd, range };
    }

    iterate(
        range: [[number, number], [number, number]],
        callback: (x: number, y: number) => void
    ): void {
        const [from, to] = range;

        for (let x = from[0]; x <= to[0]; x++) {
            for (let y = from[1]; y <= to[1]; y++) {
                callback(x, y);
            }
        }
    }

    partOne(): number {
        return this.lines.reduce((acc, val) => {
            const parsed = this.parse(val);
            if (!parsed) return acc;

            const { cmd, range } = parsed;

            this.iterate(range, (x, y) => {
                const pos = `${x}.${y}`;

                if (cmd === "off") acc.delete(pos);
                if (cmd === "toggle") acc.has(pos) ? acc.delete(pos) : acc.add(pos);
                if (cmd === "on") acc.add(pos);
            });

            return acc;
        }, new Set<string>()).size;
    }

    partTwo(): number {
        return [...this.lines.reduce((acc, val) => {
            const parsed = this.parse(val);
            if (!parsed) return acc;

            const { cmd, range } = parsed;

            this.iterate(range, (x, y) => {
                const pos = `${x}.${y}`;
                let b = acc.get(pos) || 0;
                
                if (cmd === "on") acc.set(pos, b + 1);
                if (cmd === "off") acc.set(pos, Math.max(0, b - 1));
                if (cmd === "toggle") acc.set(pos, b + 2);
            });

            return acc;
        }, new Map<string, number>())].reduce((acc, val) => acc + val[1], 0);
    }
}

export default new Day06();
