import fs from "fs";
import path from 'path';

type PartFunction = undefined | ((input: string) => number | string);

export default class Solution {
    public day: string = "01";
    public input: string = "";
    public lines: string[] = [];
    public chars: string[] = [];
    public partOneFn: PartFunction = undefined;
    public partTwoFn: PartFunction = undefined;

    constructor(day: string) {
        this.day = day;
    }

    private loadInput(): void {
        const inputPath = path.resolve(__dirname, this.day, 'input.txt');
        this.input = fs.readFileSync(inputPath, "utf-8").trim();
        this.lines = this.input.split("\n")
        this.chars = [...this.input]
    }

    partOne(): number | string | undefined {
        return this.partOneFn?.(this.input);
    }

    partTwo(): number | string | undefined {
        return this.partTwoFn?.(this.input);
    }

    async solve(part: string): Promise<[number | undefined | string, number | undefined | string]> {
        console.log(`Solving Day ${this.day}...`)
        
        this.loadInput();
        
        const part1Result = part == "1" || !part ? this.partOne() : undefined;
        const part2Result = part == "2" || !part ? this.partTwo() : undefined;
        
        console.log(`${part1Result}\n${part2Result}\n`)

        return [part1Result, part2Result];
    }
}