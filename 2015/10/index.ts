import Solution from "../solution";

class Day10 extends Solution {
    constructor() {
        super("10");
    }

   // Chunk the line by digit: 1211 => 1 2 11
   // Count digits in each chunk: 1 2 11 => 1 1 2 
   // Combine chunk length with digit type: 1 2 11 => 11 12 21
 
   // A more efficient approach would be to cache Conway compounds

    lookandsay(str: string, depth: number): string {
        if (depth === 0) return str;

        const chunks: string[] = [];
        let count = 1;
    
        for (let i = 1; i <= str.length; i++) {
            if (str[i] === str[i - 1]) {
                count++;
            } else {
                chunks.push(`${count}${str[i - 1]}`);
                count = 1;
            }
        }

        return this.lookandsay(chunks.join(""), depth - 1);
    }

    partOne() {
        return this.lookandsay(this.input, 40).length
    }

    partTwo() {
        return this.lookandsay(this.input, 50).length
    }
}

export default new Day10();
