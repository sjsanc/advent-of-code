import Solution from "../solution";

// Part One
// For each aunt sue, we need to compare what we DO know about her with the given data.
// For Sue 1, we know: children: 1, cars: 8, vizslas: 7
// This will narrow down the Sues that could be correct.
// Then, we remove the sues that have positive properties that the aunt does not have: akitas and vizslas.

// Part Two
// For cats and trees, if the Sue value is less than the known value, return true
// For poms and goldish, if the Sue value is greater than the known value, return true 
// E.g. if cats = 3 and known cats = 5, then that Sue has more than 3 cats so COULD be the correct Sue
// E.g. if cats = 5 and known cats = 5, then that Sue has more than 5 cats so CAN'T be the correct Sue


class Day16 extends Solution {
    constructor() {
        super("16")
    }

    public data: Record<string, number> = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    }

    parse() {
        return this.lines.map(l =>
            Object.fromEntries(
                l.replace(/^Sue \d+:\s*/, '')
                .split(', ')
                .map(pair => pair.split(': '))
                .map(([key, value]) => [key, Number(value)])
            )
        );
    }
    
    partOne() {
        return this.parse().findIndex(sue => 
            Object.entries(sue).every(([key, value]) => value === this.data[key])
        ) + 1 // Sues are 1-indexed
    }

    partTwo() {
        return this.parse().findIndex(sue => 
            Object.entries(sue).every(([key, value]) => {
                switch (key) {
                    case "cats" || "trees":
                        return value > this.data[key];
                    case "pomeranian" || "goldfish":
                        return value < this.data[key];
                    default:
                        return value === this.data[key];
                }
            })
        ) + 1
    }
}

export default new Day16()
