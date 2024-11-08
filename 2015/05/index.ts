import Solution from "../solution";
import { createHash } from "crypto"

const vowels = ["a", "e", "i", "o", "u"]
const verboten = ["ab", "cd", "pq", "xy"]


class Day05 extends Solution {
    constructor() {
        super("05")
    }
    
    partOne() {
        return this.lines.reduce((acc, val) => {
            for (let i = 0; i < verboten.length; i++) {
                if (val.includes(verboten[i])) return acc
            }
            let prev = ""
            let vCount = 0
            let dCount = 0
            for (let i = 0; i < val.length; i++) {
                if (vowels.includes(val[i])) vCount++
                if (val[i] == prev) dCount++
                prev = val[i]
            }
            if (vCount >= 3 && dCount > 0) return acc + 1 
            else return acc
        }, 0)
    }

    partTwo() { 
        return this.lines.reduce((acc, line) => {
            let hasPairs = false;
            let hasRepeat = false;

            for (let i = 0; i < line.length - 1; i++) {
                const pair = line.substring(i, i + 2);
                if (line.indexOf(pair, i + 2) >= 0) {
                    hasPairs = true;
                }

                if (i < line.length - 2 && line[i] === line[i + 2]) {
                    hasRepeat = true;
                }

                if (hasPairs && hasRepeat) break;
            }

            return hasPairs && hasRepeat ? acc + 1 : acc
        }, 0)
    }
}

export default new Day05()