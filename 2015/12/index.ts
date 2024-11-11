import Solution from "../solution";

class Day12 extends Solution {
    constructor() {
        super("12");
    }

    traverse(obj: any, ignoreRed: boolean): number {
        switch (typeof obj) {
            case "number": return obj
            case "object":
                return Array.isArray(obj)
                    ? obj.reduce((a, b) => a + this.traverse(b, ignoreRed), 0)
                    : ignoreRed && Object.values(obj).includes("red")
                        ? 0
                        : Object.values(obj).reduce((a: number, b) => a + this.traverse(b, ignoreRed), 0)
            default: return 0
        }
    }

    partOne() {
        return this.traverse(JSON.parse(this.input), false)
    }
    partTwo() {
        return this.traverse(JSON.parse(this.input), true)
    }
}

export default new Day12();
