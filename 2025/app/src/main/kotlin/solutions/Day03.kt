package aoc2025.solutions

import aoc2025.Solution

class Day03 : Solution(3) {
    override fun partOne(): Any {
        var total = 0
        lines.forEach { line ->
            val chunked = line.chunked(1).map { it.toInt() }
            var max = 0
            for (i in chunked.indices) {
                val largest =
                    chunked.takeLast(chunked.size - (i + 1)).maxOrNull()
                        ?: continue
                val sum = "${chunked[i]}$largest".toInt()
                if (sum > max) max = sum
            }
            total += max
        }
        return total
    }

    override fun partTwo(): Any {
        // To find the largest twelve digits, without sorting
        // Duplicate the above but add an inner loop on largest, so that it doesn't just take 1

        return ""
    }
}