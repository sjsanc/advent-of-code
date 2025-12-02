import { writeFileSync } from 'fs';
import path from 'path';
import Solution from "./solution"

async function run() {
    const day = process.argv[3]

    if (!day) {
        console.error("Day argument required")
        process.exit(1)
    }

    try {
        const module = await import(path.resolve(__dirname, day, "index.ts"))
        const solver: Solution | undefined = module.default;

        if (!(solver instanceof Solution)) {
            console.error(`No valid solution found in ${day}/index.ts`)
            process.exit(1)
        }

        const [p1, p2] = await solver.solve();

        const resultFilePath = path.resolve(__dirname, day, 'results.txt');
        const part1Result = p1 === undefined ? '' : p1;
        const part2Result = p2 === undefined ? '' : p2;
        writeFileSync(resultFilePath, `${part1Result}\n${part2Result}`, { flag: 'w' });
    } catch (error) {
        console.error(`Error loading solution for ${day}`, error)
        process.exit(1)
    }
}

run();
