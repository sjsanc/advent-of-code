import Solution from "../solution";

// newtype idiom!?
type Location = string;
type Distance = number;
type DistanceMap = Record<Location, Distance>;
type Graph = Record<Location, DistanceMap>;

class Day09 extends Solution {
    constructor() {
        super("09");
    }

    parse(input: string[]): Graph {
        const graph: Graph = {};
        input.forEach(i => {
            const [a, , b, , c] = i.split(" ");
            const distance = Number(c);

            if (!graph[a]) graph[a] = {};
            if (!graph[b]) graph[b] = {};

            graph[a][b] = distance;
            graph[b][a] = distance;
        });
        return graph;
    }

    // Low-effort brute force implementation of the Open TSP, apparently
    // We enumerate all possible routes (permutations) and calculate a distance for each.
    permute<T>(arr: T[]): T[][] {
        const result: T[][] = [];
        if (arr.length === 1) return [arr];
        for (let i = 0; i < arr.length; i++) {
            const rest = arr.slice(0, i).concat(arr.slice(i + 1));
            for (const perm of this.permute(rest)) {
                result.push([arr[i], ...perm]);
            }
        }
        return result;
    }

    distance(route: Location[], graph: Graph): number {
        let totalDistance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            const from = route[i];
            const to = route[i + 1];
            totalDistance += graph[from][to]; 
        }
        return totalDistance;
    }

    partOne() {
        const graph = this.parse(this.lines);
        const locations = Object.keys(graph); 
        const permutations = this.permute(locations);
        let minDistance = Infinity;

        for (const route of permutations) {
            const distance = this.distance(route, graph);
            minDistance = Math.min(minDistance, distance);
        }
        return minDistance;
    }

    partTwo() {
        const graph = this.parse(this.lines);
        const locations = Object.keys(graph); 
        const permutations = this.permute(locations);
        let maxDistance = 0;

        for (const route of permutations) {
            const distance = this.distance(route, graph);
            maxDistance = Math.max(maxDistance, distance);
        }
        return maxDistance;
    }
}

export default new Day09();
