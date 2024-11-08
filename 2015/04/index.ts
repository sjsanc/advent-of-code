import Solution from "../solution";
import { createHash } from "crypto"

class Day04 extends Solution {
    constructor() {
        super("04")
    }

    matcher(zeroes: number) {
        const match = "0".repeat(zeroes)
        let i = 0;
        while (true) {
            let hash = createHash('md5').update(`${this.input}${i}`).digest('hex')
            if (hash.slice(0, zeroes) === match) break
            i++
        }
        return i
    }

    partOne() {
        return this.matcher(5)
    }

    partTwo() {
        return this.matcher(6)
    }
}

export default new Day04()