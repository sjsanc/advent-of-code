import Solution from "../solution";

class Day08 extends Solution {
    constructor() {
        super("08")
    }

    partOne() {
        return this.lines.reduce((acc, line) => {
            let chars = line.length
            let strlen = 0;

            for (let i = 0; i < line.length; i++) {
                if (i == 0 || i == line.length - 1) {
                    continue
                }

                const curr = line[i]
                const next = line[i + 1]

                if (curr == "\\") {
                    if (next == "\"" || next == "\\") {
                        strlen++
                        i += 1
                    } else if (next == "x") {
                        strlen++
                        i += 3
                    }
                } else {
                    strlen++
                }
            }

            return acc += (chars - strlen)
        }, 0);
    }

    partTwo() {
        return this.lines.reduce((acc, line) => {
            let chars = line.length
            let enc = ""

            for (let i = 0; i < line.length; i++) {
                

                if (i == 0 || i == line.length - 1) {
                    enc += "\""
                } 

                const curr = line[i]
                const next = line[i + 1]
                
                if (curr == "\\") {
                    enc += "\\\\"
                } else if (curr == "\"") {
                    enc += "\\\""
                } else {
                    enc += curr
                }
                
            }

            console.log(enc.length)

            return acc + (enc.length - chars)
        }, 0);   
    }
}

export default new Day08()