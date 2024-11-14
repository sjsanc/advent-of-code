import Solution from "../solution";

// https://github.com/NiXXeD/adventofcode/blob/master/2015/day14/part2.js
// Ultimately, I had an off by one error that made me reach for this.
// Still unsure why the cycle method from the previous commit didn't work.

type Reindeer = {
    speed: number;
    flyTime: number;
    restTime: number;
    distance: number;
    points: number;
    isResting: boolean;
    remaining: number;
};

class Day14 extends Solution {
    constructor() {
        super("14")
    }

    parse(line: string): Reindeer {
        const [speed, flyTime, restTime] = line.match(/(\d+)/g)!.map(Number)
        return {speed, flyTime, restTime, isResting: false, remaining: flyTime, distance: 0, points: 0}
    }

    race(duration: number, scoreBy: "points" | "distance") {
        const reindeers = [...this.lines].map(line => this.parse(line));

        for (let i = 1; i < duration; i++) {
            reindeers.forEach(r => {
                if (!r.isResting) r.distance += r.speed;
                if (!--r.remaining) {
                    r.isResting = !r.isResting;
                    r.remaining = r.isResting ? r.restTime : r.flyTime;
                }
            })

            const maxDistance = Math.max(...reindeers.map(r => r.distance));
            reindeers.filter(r => r.distance === maxDistance).forEach(r => r.points++);
        }

        return Math.max(...reindeers.map(r => r[scoreBy]));
    }
    
    partOne() {
        return this.race(2503, "distance")
    }

    partTwo() {
        return this.race(2503, "points")
    }
}

export default new Day14()