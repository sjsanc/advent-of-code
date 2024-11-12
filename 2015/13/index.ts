import Solution from "../solution";

type Person = string
type Happiness = number
type Graph = Record<Person, Record<Person, Happiness>>

class Day13 extends Solution {
    constructor() {
        super("13");
    }

    parse(str: string): [Person, Happiness, Person] {
        const words = str.split(" ");
        const happiness = words[2] == "lose" ? -parseInt(words[3]) : parseInt(words[3])
        return [words[0], happiness, words[words.length - 1].replace(".", "")];
    }

    static *permute(arr: string[], n = arr.length): Generator<string[]> {
        if (n <= 1) yield arr.slice();
        else {
            for (let i = 0; i < n; i++) {
                yield* Day13.permute(arr, n - 1);
                const j = n % 2 ? 0 : i;
                [arr[n - 1], arr[j]] = [arr[j], arr[n - 1]]; // swap
            }
        }
    }

    permutations(you: boolean): { graph: Graph, permutations: string[][] } {
        const pairs = this.lines.map(this.parse)
        const graph: Graph = {}
        pairs.forEach(p => {
            if (!graph[p[0]]) graph[p[0]] = {}
            graph[p[0]][p[2]] = p[1]
        })
        if (you) {
            graph["You"] = {};
            Object.keys(graph).forEach(person => {
                if (person !== "You") {
                    graph[person]["You"] = 0;
                    graph["You"][person] = 0;
                }
            });
        }
        return { graph, permutations: Array.from(Day13.permute(Object.keys(graph))) }
    }

    findMax(graph: Graph, permutations: string[][]): number {
        return permutations.reduce((max, permutation) => {
            let total = 0;
            permutation.forEach((person, i) => {
                const rhs = i == permutation.length - 1 ? permutation[0] : permutation[i + 1]
                const lhs = i == 0 ? permutation[permutation.length - 1] : permutation[i - 1]
                total += graph[person][rhs] + graph[person][lhs]
            })
            return Math.max(max, total)
        }, 0)
    }

    partOne() {
        const {graph, permutations} = this.permutations(false)
        return this.findMax(graph, permutations)
    }

    partTwo() {
        const {graph, permutations} = this.permutations(true)
        return this.findMax(graph, permutations)
    }
}

export default new Day13();
