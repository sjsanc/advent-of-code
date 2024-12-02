package main

import (
	Day01 "aoc2024/01"
	Day02 "aoc2024/02"
	"flag"
)

func main() {
	day := flag.Int("day", 1, "Day to run")
	flag.Parse()

	println("Day", *day)

	switch *day {
	case 1:
		Day01.Solve()
	case 2:
		Day02.Solve()
	}
}
