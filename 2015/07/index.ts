import Solution from "../solution"

// Unfortunately, I was unable to solve this on my own :(
// https://eddmann.com/posts/advent-of-code-2015-day-7-some-assembly-required/

// Alternative solution:
// https://beautifulracket.com/wires/intro.html

class Day07 extends Solution {
    constructor() {
        super("07");
    }

    sort(input: string[]): [string, string[]][] {
        const deps = new Map<string, string[]>();
        const instructions = new Map<string, string[]>();

        input.forEach(line => {
            const [ins, wire] = line.split(" -> ");
            const dependencies = ins.match(/[a-z]+/g) || [];
            deps.set(wire, dependencies);
            instructions.set(wire, ins.split(" "));
        });

        const visited = new Set<string>();
        const stack: string[] = [];

        const search = (wire: string) => {
            if (!visited.has(wire)) {
                visited.add(wire);
                deps.get(wire)?.forEach(search);
                stack.push(wire);
            }
        };

        deps.forEach((_, wire) => search(wire));

        return stack.map(wire => [wire, instructions.get(wire) as string[]]);
    }

    resolve(map: Map<string, number>, instruction: string[]): number {
        const get = (token: string): number => map.has(token) ? map.get(token)! : parseInt(token);

        switch (true) {
            case instruction.includes('AND'):
                return get(instruction[0]) & get(instruction[2]);
            case instruction.includes('OR'):
                return get(instruction[0]) | get(instruction[2]);
            case instruction.includes('LSHIFT'):
                return get(instruction[0]) << get(instruction[2]);
            case instruction.includes('RSHIFT'):
                return get(instruction[0]) >> get(instruction[2]);
            case instruction.includes('NOT'):
                return ~get(instruction[1]) & 0xffff;
            default:
                return get(instruction[0]);
        }
    }

    partOne(): number | undefined {
        const signals = this.sort(this.lines).reduce(
            (signals, [wire, instruction]) => signals.set(wire, this.resolve(signals, instruction)),
            new Map<string, number>()
        );

        return signals.get('a');
    }

    partTwo() {
        const a = this.partOne()?.toString();
        this.input = this.input.replace(/^\d+ -> b$/gm, `${a} -> b`);
        this.lines = this.input.split('\n');
        const signals = this.sort(this.lines).reduce(
            (signals, [wire, instruction]) => signals.set(wire, this.resolve(signals, instruction)),
            new Map<string, number>()
        )
        return signals.get('a');
    }
}

export default new Day07();
