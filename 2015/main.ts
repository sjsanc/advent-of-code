import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import Solution from "./solution"

async function run() {
    const args = process.argv.slice(3)
    
    const dayArg = args[0]
    const partArg = args[1]

    const root = path.resolve(__dirname);
    const days = readdirSync(root, { withFileTypes: true });

    for (const day of days) {
        if (day.isDirectory() && day.name !== "node_modules") {
            if (dayArg && day.name !== dayArg) continue

            try {
                const module = await import(path.resolve(root, day.name, "index.ts"))
                const solver: Solution | undefined = module.default;

                if (solver instanceof Solution) {
                    const [p1, p2] = await solver.solve(partArg);

                    const inputDir = path.resolve(root, day.name);
                    const resultFilePath = path.resolve(inputDir, 'results.txt');

                    writeFileSync(resultFilePath, `${p1}\n${p2}`, { flag: 'w' });
                } else {
                    console.warn(`No valid solution found in ${day.name}/index.ts`)
                }
            } catch (error) {
                console.error(`Error loading solution for ${day.name}`, error)
            }
        }
    }
}

run();
