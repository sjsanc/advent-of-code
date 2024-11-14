import Solution from "../solution";

class Day18 extends Solution {
    constructor() {
        super(__dirname);
    }

    update(config: number[][], steps: number, corners: boolean = false, step = 0): number[][] {
        if (corners) {
            config[0][0] = 1;
            config[0][config[0].length - 1] = 1;
            config[config.length - 1][0] = 1;
            config[config.length - 1][config[0].length - 1] = 1;
        }

        const newConfig = config.map(row => row.slice());

        for (let y = 0; y < config.length; y++) {
            for (let x = 0; x < config[y].length; x++) {
                let neighboursOn = 0;

                if (corners) {
                    if (y === 0 && x === 0) continue;
                    if (y === 0 && x === config[0].length - 1) continue;
                    if (y === config.length - 1 && x === 0) continue;
                    if (y === config.length - 1 && x === config[0].length - 1) continue;
                }

                // Check neighbors
                if (config[y - 1]) {
                    if (config[y - 1][x - 1] === 1) neighboursOn++; // top-left
                    if (config[y - 1][x] === 1) neighboursOn++; // top
                    if (config[y - 1][x + 1] === 1) neighboursOn++; // top-right
                }
                if (config[y + 1]) {
                    if (config[y + 1][x - 1] === 1) neighboursOn++; // bottom-left
                    if (config[y + 1][x] === 1) neighboursOn++; // bottom
                    if (config[y + 1][x + 1] === 1) neighboursOn++; // bottom-right
                }
                if (config[y][x - 1] === 1) neighboursOn++; // left
                if (config[y][x + 1] === 1) neighboursOn++; // right

                const light = config[y][x];
                if (light && neighboursOn !== 2 && neighboursOn !== 3) {
                    newConfig[y][x] = 0;
                }
                if (!light && neighboursOn === 3) {
                    newConfig[y][x] = 1;
                }
            }
        }

        if (step + 1 === steps) return newConfig;
        return this.update(newConfig, steps - 1, corners);
    }


    parse() {
        return this.lines.map(l => l.split("").map(c => c == "#" ? 1 : 0));
    }

    partOne() {
        return this.update(this.parse(), 100, false).flat().filter(c => c == 1).length;
    }

    partTwo() {
        return this.update(this.parse(), 100, true).flat().filter(c => c == 1).length;
    }
}

export default new Day18();