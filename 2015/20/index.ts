import Solution from "../solution";

// The presents each house receives is the sum of its factors
// Apparently, this can be optimised using a prime factorisation method?

class Day20 extends Solution {
    constructor() {
        super(__dirname);
    }

    factorise(mult: number, cap?: number) {
        let idx = 1;
        while (true) {
            const factors = []
            for (let i = 1; i <= Math.sqrt(idx); i++) {
                if (idx % i === 0) {
                    factors.push(i)
                    if (i !== idx / i) factors.push(idx / i)
                }
                if (cap && factors.length == cap) break
            }
            if (factors.reduce((a,b) => a + b, 0) * mult > Number(this.input)) {
                return idx
            } 
            idx++
        }
    }

    partOne() {
        return this.factorise(10)
    }

    partTwo() {
        return this.factorise(11, 50)
    }
}

export default new Day20();
