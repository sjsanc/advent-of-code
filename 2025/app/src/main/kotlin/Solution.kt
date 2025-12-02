package aoc2025

abstract class Solution(private val dayNumber: Int) {
    var day: Int = dayNumber
    var input: String
    var lines: List<String>

    init {
        val resourcePath = "${dayNumber.toString().padStart(2, '0')}/input.txt"
        val resource = javaClass.classLoader.getResourceAsStream(resourcePath)
            ?: throw IllegalArgumentException("Could not find input file: $resourcePath")

        input = resource.bufferedReader().use { it.readText() }.trim()

        lines = input.lines()
    }

    abstract fun partOne(): Any
    abstract fun partTwo(): Any

    fun solve() {
        val part1 = partOne()
        val part2 = partTwo()

        println(part1)
        println(part2)

        val projectRoot = System.getProperty("user.dir")
        val dayFormatted = dayNumber.toString().padStart(2, '0')
        val outputPath = "$projectRoot/$dayFormatted/output.txt"
        val outputFile = java.io.File(outputPath)
        outputFile.parentFile?.mkdirs()
        outputFile.writeText("$part1\n$part2\n")
    }
}