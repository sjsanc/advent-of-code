package Day01

import (
	"aoc2024/internal"
	"math"
	"slices"
	"strconv"
	"strings"
)

func parse(lines []string) ([]int, []int) {
	left := []int{}
	right := []int{}

	for _, l := range lines {
		chars := strings.Split(l, "   ")
		l, _ := strconv.Atoi(chars[0])
		r, _ := strconv.Atoi(chars[1])
		left = append(left, l)
		right = append(right, r)
	}

	slices.Sort(left)
	slices.Sort(right)

	return left, right
}

func Solve() {
	s := internal.NewSolution(1)

	left, right := parse(s.Lines)

	set := map[int]int{}
	for _, r := range right {
		set[r]++
	}

	distance := 0
	similarity := 0

	for i, l := range left {
		similarity += l * set[l]
		distance += int(math.Abs(float64(l - right[i])))
	}

	s.Write(distance, similarity)
}
