package aoc2025.solutions

import aoc2025.Solution

class Day02 : Solution(2) {
    override fun partOne(): Any {
        var total = 0.0
        lines = input.split(",")
        lines.forEach { item -> 
            val (start, end) = item.split("-")
            for (id in start.toLong()..end.toLong()) {
                val str = id.toString()
                val len = str.length
                if (len % 2 == 0) {
                    if (str.all { it == str[0] }) {
                        total += id
                    } else {
                        val mid = str.length / 2
                        val left = str.take(mid)
                        val right = str.drop(mid)
                        if (left == right) {
                            total += id
                        }
                    }
                }
            }
        }
        return ""
    }

    override fun partTwo(): Any {
        var total = 0.0
        lines = input.split(",")
        lines.forEach { item ->
            val (start, end) = item.split("-")
            for (id in start.toLong()..end.toLong()) {
                val str = id.toString()

                for (len in 1..str.length / 2) {
                    val chunks = str.chunked(len) // if 2 then [22, 44, 55], 3 then [444,555,666]
                    if (chunks.all { it == chunks[0] }) {
                        total += id
                        println(id)
                        break
                    }
                }

            }
        }

        return total.toLong()
    }
}