package aoc2025

import aoc2025.solutions.Day01

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("Usage: <day> [part]")
        return
    }

    val day = args[0].toInt()

    val solution = when (day) {
        1 -> Day01()
        else -> {
            println("Day $day not implemented yet")
            return
        }
    }

    solution.solve()
}