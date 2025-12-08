package aoc2025.solutions

import aoc2025.Solution

class Day04 : Solution(4) {
    fun findRemovableRolls(lines:  MutableList<MutableList<Char>>): List<Pair<Int, Int>> {
        val rollsToRemoveIdx = mutableListOf<Pair<Int, Int>>()
        lines.withIndex().forEach { (row, line) ->
            line.withIndex().forEach { (idx, item) ->
                if (item == '.') return@forEach

                val prevRow = lines.getOrNull(row - 1)
                val nextRow = lines.getOrNull(row + 1)
                var adjacent = 0

                val left = line.getOrNull(idx - 1)
                if (left != null && left == '@') adjacent++
                val topLeft = prevRow?.getOrNull(idx - 1)
                if (topLeft != null && topLeft == '@') adjacent++
                val top = prevRow?.getOrNull(idx)
                if (top != null && top == '@') adjacent++
                val topRight = prevRow?.getOrNull(idx + 1)
                if (topRight != null && topRight == '@') adjacent++
                val right = line.getOrNull(idx + 1)
                if (right != null && right == '@') adjacent++
                val bottomRight = nextRow?.getOrNull(idx + 1)
                if (bottomRight != null && bottomRight == '@') adjacent++
                val bottom = nextRow?.getOrNull(idx)
                if (bottom != null && bottom == '@') adjacent++
                val bottomLeft = nextRow?.getOrNull(idx - 1)
                if (bottomLeft != null && bottomLeft == '@') adjacent++

                if (adjacent < 4) {
                    rollsToRemoveIdx.add(row to idx)
                }
            }
        }
        return rollsToRemoveIdx
    }

    fun removeRolls(lines: MutableList<MutableList<Char>>, coords: List<Pair<Int, Int>>) {
        for (row in lines.indices) {
            for (roll in lines[row].indices) {
                if ((row to roll) in coords) {
                    lines[row][roll] = '.'
                }
            }
        }
    }

    override fun partOne(): Any {
        val linesMut = lines.map { it.toMutableList() }.toMutableList()
        return findRemovableRolls(linesMut).size
    }

    override fun partTwo(): Any {
        val linesMut = lines.map { it.toMutableList() }.toMutableList()

        var totalRollsRemoved = 0
        var latestRolesRemoved = 0

        do {
            val idxToRemove = findRemovableRolls(linesMut)
            removeRolls(linesMut, idxToRemove)
            totalRollsRemoved += idxToRemove.size
            latestRolesRemoved = idxToRemove.size
        } while (latestRolesRemoved > 0)

        return totalRollsRemoved
    }
}