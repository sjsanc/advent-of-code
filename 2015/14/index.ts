import Solution from "../solution";

class Day14 extends Solution {
    constructor() {
        super("14")
    }

    parse(line: string): [...number[]] {
        return line.split(" ").flatMap(e => parseInt(e) ? parseInt(e) : [])
    }

    race(duration: number) {
        const distance = this.lines.map(this.parse).reduce((acc: number[], [speed, fly, rest]) => {
            const cycles = Math.floor(duration / (rest + fly))
            const remaining = Math.min(duration % (rest + fly), fly)

            return [...acc, (cycles * fly + remaining) * speed]
        }, [])

        console.log(distance)

        return 0
    }
    
    partOne() {
        return this.race(2503)
    }

    partTwo() {
        // const reindeers = this.lines.map(this.parse)
        // const distance = Array(reindeers.length).fill(0)

        // for (let i = 1; i <= 2503; i++) {
        //     reindeers.forEach(([speed, fly, rest], reindeer) => {
        //         if (i % (fly + rest) <= fly) {
        //             distance[reindeer] += speed
        //         }
        //     })
        // }

        // console.log(distance)

        // return 0

        return [...Array(2503)].reduce(r => {
            r.forEach((e: any) => {
                if (!e.rest) e.distance += e.speed
                if (!--e.remaining) {
                    e.rest = !e.rest
                    e.remaining = e.rest ? e.restTime : e.flyTime
                }
            })
            var max = r.reduce((r: any, v: any) => r > v.distance ? r : v.distance, 0)
            r.filter((e: any) => e.distance == max).forEach((e: any) => e.points++)
            return r
        }, [...this.lines].map((s: any) => s.match(/(\d+)/g)).map((m: any) => ({
            speed: +m[0], flyTime: +m[1], restTime: +m[2], distance: 0, remaining: +m[1], points: 0
        }))).reduce((r: any, v: any) => r > v.points ? r : v.points, 0)


        // RECONCILE THESE TWO BEFORE CONTINUING
        // https://github.com/NiXXeD/adventofcode/blob/master/2015/day14/part2.js
    }
}

export default new Day14()