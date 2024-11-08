import Solution from "../solution"

class Day01 extends Solution {
    constructor() {
        super("01");
    }

    partOne() {
        return this.chars.reduce((acc, val) => val == "(" ? acc + 1 : acc - 1, 0)
    }

    partTwo() {
        return this.chars.reduce((acc, val, i) => acc.floors === -1 ? acc : { 
            floors: val === "(" ? acc.floors + 1 : acc.floors - 1,
            index: i + 1
        }, { floors: 0, index: 0 }).index;
    }
}

export default new Day01()