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
        return ""
    }

    override fun partTwo(): Any {
        // To find the largest twelve digits, without sorting
        // Duplicate the above but add an inner loop on largest, so that it doesn't just take 1

        // For each pack, as an unsorted list, map the indices of the 12 largest numbers to a fixed-length list of 12.
        // Then, sort the indices in ascending order. This will map to their original positions.
        // To find the largest number that hasn't been yet mapped, find the max of a sublist.

        // That won't work, because each digit has a different significance. A 1 in a higher position confers more value.
        // So rather than using maxBy to find the largest value, count from the left?
        var total = 0
        lines.forEach { line ->
            val chunked = line.chunked(1).map { it.toInt() }
            val chunkedMut = chunked.toMutableList()
            val idxToFlip = MutableList(12) { 0 }

            for (i in idxToFlip.indices) {
                var (idx, max) = chunkedMut.withIndex().maxBy { it.value }
                idxToFlip[i] = idx
                chunkedMut[idx] = 0
            }

            var flipped = idxToFlip.sorted().map { chunked[it] }

            // println(idxToFlip)
            println(flipped)
            // total += flipped.sum()
        }

        return ""
    }
}