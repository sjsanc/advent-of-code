package aoc2025

import aoc2025.solutions.Day01
import aoc2025.solutions.Day02
import aoc2025.solutions.Day03
import aoc2025.solutions.Day04

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("Usage: <day> [part]")
        return
    }

    val day = args[0].toInt()

    val solution = when (day) {
        1 -> Day01()
        2 -> Day02()
        3 -> Day03()
        4 -> Day04()
        else -> {
            println("Day $day not implemented yet")
            return
        }
    }

    solution.solve()
}