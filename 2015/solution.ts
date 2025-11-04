import fs from "fs";
import path from 'path';

export default class Solution {
    public day: string = "01";
    public input: string = "";
    public lines: string[] = [];
    public chars: string[] = [];

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
        return undefined;
    }

    partTwo(): number | string | undefined {
        return undefined;
    }

    async solve(): Promise<[number | undefined | string, number | undefined | string]> {
        this.loadInput();

        const part1Result = this.partOne();
        const part2Result = this.partTwo();

        return [part1Result, part2Result];
    }
}
