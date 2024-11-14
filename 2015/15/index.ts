import Solution from "../solution";

class Day15 extends Solution {
    constructor() {
        super("15")
    }

    parse(line: string): number[] {
        return line.match(/-?\d+/g)!.map(Number)
    }

    // Recursive calculation of integer partitions.
    combinations(parts: number, target: number, arr: number[] = [], result: number[][] = []): number[][] {
        if (arr.length === parts - 1) {
            result.push([...arr, target]);
            return result;
        }
    
        for (let i = 0; i <= target; i++) {
            this.combinations(parts, target - i, [...arr, i], result);
        }
    
        return result;
    }

    // Could this be optimised by caching repeated values?
    score(amounts: number[], ingredients: number[][]): [number, number] {
        const propertyCount = ingredients[0].length - 1;
        let totalScore = 1;
        let calories = 0;
    
        for (let i = 0; i < propertyCount; i++) {
            let propertyScore = 0;
            for (let j = 0; j < ingredients.length; j++) {
                propertyScore += ingredients[j][i] * amounts[j];
            }
            if (propertyScore < 0) {
                propertyScore = 0;
            }
            totalScore *= propertyScore;
        }

        for (let j = 0; j < ingredients.length; j++) {
            calories += ingredients[j][propertyCount] * amounts[j];
        }
    
        return [totalScore, calories];
    }

    bake(): [number, number] {
        const ingredients = this.lines.map(line => this.parse(line))

        const weights = this.combinations(ingredients.length, 100)

        let maxScore = 0
        let maxCaloriesScore = 0
        for (const weight of weights) {
            const [score, calories] = this.score(weight, ingredients)
            if (score > maxScore) {
                maxScore = score
            }
            if (calories === 500 && score > maxCaloriesScore) {
                maxCaloriesScore = score
            }
        }

        return [maxScore, maxCaloriesScore]
    }

    partOne() {
        const [result] = this.bake()
        return result
    }

    partTwo() {
        const [, result] = this.bake()
        return result
    }
}

export default new Day15()
