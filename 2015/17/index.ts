import Solution from "../solution";

class Day17 extends Solution {
    constructor() {
        super(__dirname);
    }
 
    combine(integers: number[], target: number, combinations: number[][] = [[]], index: number = 0): number[][] {
        const num = integers[index]

        const newCombinations: number[][] = combinations.reduce((acc: number[][], combination: number[]) => {
            const newCombination = [...combination, num];
            const sum = newCombination.reduce((acc, val) => acc + val, 0);
            if (sum <= target) acc.push(newCombination);
            return acc;
        }, []);    

        combinations.push(...newCombinations);

        if (index == integers.length - 1) return combinations
        return this.combine(integers, target, combinations, index + 1);
    }

    search(target: number) {
        return this.combine(this.lines.map(Number), target).filter(c => c.reduce((acc, val) => acc + val, 0) === target);
    }

    partOne() {
        return this.search(150).length;
    }

    partTwo() {
        const combinations = this.search(150).sort((a,b) => a.length - b.length)
        return combinations.filter(c => c.length === combinations[0].length).length;
    }
}

export default new Day17();