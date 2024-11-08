import Solution from "../solution";

class Day02 extends Solution {
    constructor() {
        super("02")
    }

    partOne() {
        return this.lines.reduce((total, line) => {
            const [l, w, h] = line.split("x").map(Number)
            return total + ((2 * l * w) + (2 * w * h) + (2 * h * l) + Math.min(l * w, w * h, h * l))
        }, 0)
    }

    partTwo() {
        return this.lines.reduce((total, line) => {
            const [a, b, c] = line.split("x").map(Number).sort((x, y) => x - y)
            return total + (a + a) + (b + b) + (a * b * c)
        }, 0)
    }
}

export default new Day02()