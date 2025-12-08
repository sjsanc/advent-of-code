package aoc2025.solutions

import aoc2025.Solution

class Day05 : Solution(5) {
    fun parse(lines: List<String>): Pair<MutableList<LongRange>, List<Long>> {
        val split = lines.indexOf("")
        val ranges = lines.subList(0, split)
        val freshRanges: MutableList<LongRange> = mutableListOf()
        ranges.withIndex().forEach { (idx, range) ->
            val (from, to) = range.split("-")
            freshRanges.add(from.toLong()..to.toLong())
        }
        val ids: List<Long> = lines.subList(split + 1, lines.size).map { it.toLong() }
        return freshRanges to ids
    }

    fun testFreshness(ranges: MutableList<LongRange>, ids: List<Long>): Int {
        var total = 0
        for (id in ids) {
            for (range in ranges) {
                if (range.contains(id)) {
                    // println("range: $range, id: $id")
                    total++
                    break
                }
            }
        }
        return total
    }

    override fun partOne(): Any {
        val (freshRanges, ids) = parse(lines)
        return testFreshness(freshRanges, ids)
    }

    override fun partTwo(): Any {
        val (freshRanges, ids) = parse(lines)
        val masterRange = mutableListOf<LongRange>()
        freshRanges.sortBy { it.first }

        for (range in freshRanges) {
            val last = masterRange.lastOrNull()
            if (last == null) {
                masterRange.add(range)
            } else {
                if (range.first <= last.last) {
                    masterRange[masterRange.lastIndex] = last.first..maxOf(last.last, range.last)
                } else {
                    masterRange.add(range)
                }
            }
        }

        return masterRange.sumOf { it.last - it.first + 1 }
    }
}