package Day03

import (
	"aoc2024/internal"
	"regexp"
	"strconv"
)

var solution = internal.NewSolution(3)

var r1 = regexp.MustCompile(`mul\(\d{1,3},\d{1,3}\)`)
var r2 = regexp.MustCompile(`mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)`)
var r3 = regexp.MustCompile(`\d{1,3}`)

func PartOne() {
	muls := r1.FindAllString(solution.Input, -1)
	sum := 0
	for _, m := range muls {
		nums := r3.FindAllString(m, -1)
		a, _ := strconv.Atoi(nums[0])
		b, _ := strconv.Atoi(nums[1])
		sum += a * b
	}
	println(sum)
}

func PartTwo() {
	cmds := r2.FindAllString(solution.Input, -1)
	sum := 0
	do := true
	for _, m := range cmds {
		if m == "do()" {
			do = true
		} else if m == "don't()" {
			do = false
		} else {
			if !do {
				continue
			}
			nums := r3.FindAllString(m, -1)
			a, _ := strconv.Atoi(nums[0])
			b, _ := strconv.Atoi(nums[1])
			sum += a * b
		}
	}
	println(sum)
}

func Solve() {
	PartOne()
	PartTwo()
}
