package aoc2025.solutions

import aoc2025.Solution

class Day04 : Solution(4) {
    override fun partOne(): Any {
        var rolls = 0

        lines.withIndex().forEach { (row, line) ->
            line.withIndex().forEach { (idx, item) ->
                if (item == '.') {
                    // print('.')
                    return@forEach
                }

                var previousRow = lines.getOrNull(row - 1)
                var nextRow = lines.getOrNull(row + 1)
                var adjacent = 0

                var left = line.getOrNull(idx - 1)
                if (left != null && left == '@') adjacent++
                var topLeft = previousRow?.getOrNull(idx - 1)
                if (topLeft != null && topLeft == '@') adjacent++
                var top = previousRow?.getOrNull(idx)
                if (top != null && top == '@') adjacent++
                var topRight = previousRow?.getOrNull(idx + 1)
                if (topRight != null && topRight == '@') adjacent++
                var right = line.getOrNull(idx + 1)
                if (right != null && right == '@') adjacent++
                var bottomRight = nextRow?.getOrNull(idx + 1)
                if (bottomRight != null && bottomRight == '@') adjacent++
                var bottom = nextRow?.getOrNull(idx)
                if (bottom != null && bottom == '@') adjacent++
                var bottomLeft = nextRow?.getOrNull(idx - 1)
                if (bottomLeft != null && bottomLeft == '@') adjacent++

                if (adjacent < 4) {
                    // print("x")
                    rolls++
                } else {
                    print('@')
                }
            }
            // println("")
        }

        return rolls.toLong()
    }

    override fun partTwo(): Any {
        return 0.0
    }
}