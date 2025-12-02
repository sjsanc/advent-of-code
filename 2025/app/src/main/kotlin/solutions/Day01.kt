package aoc2025.solutions

import aoc2025.Solution

class Day01 : Solution(1) {
    override fun partOne(): Any {
        var total = 0
        var current = 50
        
        lines.forEach { item ->
            var dir = item[0]
            var num = item.drop(1).toInt()

            if (dir == 'L') {
                current = Math.floorMod(current - num, 100)
            } else {
                current = Math.floorMod(current + num, 100)
            }

            if (current == 0) {
                total++
            }
        }

        return total
    }

    // Can't believe I had to resort to bruting it...

    override fun partTwo(): Any {
        var total = 0
        var current = 50

        lines.forEach { item -> 
            var dir = item[0]
            var num = item.drop(1).toInt()
            
            if (dir == 'L') {
                for (i in 1..num) {
                    current = Math.floorMod(current - 1, 100)
                    if (current == 0) total++
                }
            } else {
                for (i in 1..num) {
                    current = Math.floorMod(current + 1, 100)
                    if (current == 0) total++
                }
            }
        }

        return total
    }
}