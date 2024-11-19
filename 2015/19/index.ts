import Solution from "../solution";

type From = string
type To = string
type Replacement = { from: From, to: To }
type Molecule = string

class Day19 extends Solution {
    constructor() {
        super(__dirname);
    }

    parse(): [Replacement[], Molecule] {
        return [
            this.lines.slice(0, this.lines.length - 2).map(l => {
                const [from, to] = l.split(" => ");
                return { from, to };
            }),
            this.lines[this.lines.length - 1] as Molecule
        ];
    }

    partOne() {
        const [replacements, molecule] = this.parse();
        const set = new Set()

        for (let i = 0; i < molecule.length; i++) {
            replacements.forEach(({ from, to }) => {
                const match = molecule.slice(i, i + from.length);
                if (match === from) {
                    const m = molecule.slice(0, i) + to + molecule.slice(i + from.length)
                    set.add(m)
                }
            })
        }

        return set.size
    }

    // Hard! Come back to this later.
    // partTwo()
}

export default new Day19();