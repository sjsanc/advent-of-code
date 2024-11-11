import Solution from "../solution";

class Day11 extends Solution {
    constructor() {
        super("11");
    }

    // Increment the last character in the string
    // abcdefgh => abcdefgi

    // If it exceed\s the ASCII a-z range, wrap it around and increment the left adjacent character 
    // abcdefgz => abcdefha

    // If a char is i, o or l, increment by 1
    // hijklmno => hjjkmmnp

    // A sequence of 3 must exist
    // abc / xyz etc

    // At least 2 different letter pairs
    // aa, bb, cc etc

    test(input: string) {
        if (input.includes("i") || input.includes("o") || input.includes("l")) {
            return false;
        }
        
        const pairs = new Set();
        for (let i = 0; i < input.length - 1; i++) {
            if (input[i] === input[i + 1] && input[i] !== input[i - 1]) {
                pairs.add(`${input[i]}${input[i + 1]}`);
            }
        }
        if (pairs.size < 2) {
            return false;
        }

        let seq = false;
        for (let i = 0; i < input.length - 2; i++) {
            if (input.charCodeAt(i) + 1 === input.charCodeAt(i + 1) && input.charCodeAt(i) + 2 === input.charCodeAt(i + 2)) {
                seq = true;
                break;
            }
        }

        if (!seq) {
            return false;
        }

        return seq;
    }

    increment(input: string) {
        const chars = input.split("");
        let i = chars.length - 1;
        while (i >= 0) {
            if (chars[i] === "z") {
                chars[i] = "a";
                i--;
            } else {
                chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
                break;
            }
        }

        return chars.join("");
    }

    partOne() {
        let next = this.input
        
        while (this.test(next) === false) {
            next = this.increment(next)
        }

        return next
    }

    partTwo() {
        let next = this.input
        let second = false;

        while (this.test(next) === false || !second) {
            if (this.test(next)) second = true;
            next = this.increment(next)
        }

        return next
    }
}

export default new Day11();
