package Day02

import (
	"aoc2024/internal"
	"math"
	"strconv"
	"strings"
)

type Dir string

const (
	Up   Dir = "up"
	Down Dir = "down"
)

func variants(chars []string) [][]string {
	v := [][]string{}
	for i := 0; i < len(chars); i++ {
		v = append(v, append(append([]string{}, chars[:i]...), chars[i+1:]...))
	}
	return v
}

func getDir(chars []string) Dir {
	a, _ := strconv.Atoi(chars[0])
	b, _ := strconv.Atoi(chars[1])
	if a < b {
		return Up
	}
	return Down
}

func testPair(x, y string, dir Dir) bool {
	a, _ := strconv.Atoi(x)
	b, _ := strconv.Atoi(y)
	dist := math.Abs(float64(a) - float64(b))
	if a == b || (dir == Up && a > b) || (dir == Down && a < b) || dist > 3 || dist < 1 {
		return false
	}
	return true
}

func testLine(chars []string) bool {
	dir := getDir(chars)
	for i := 0; i < len(chars)-1; i++ {
		if !testPair(chars[i], chars[i+1], dir) {
			return false
		}
	}
	return true
}

func PartOne() {
	s := internal.NewSolution(2)
	count := 0
	for _, l := range s.Lines {
		chars := strings.Split(l, " ")
		if testLine(chars) {
			count++
		}
	}
	println(count)
}

func PartTwo() {
	s := internal.NewSolution(2)
	count := 0
	for _, l := range s.Lines {
		chars := strings.Split(l, " ")
		if !testLine(chars) {
			vars := variants(chars)
			for _, v := range vars {
				if testLine(v) {
					count++
					break
				}
			}
		} else {
			count++
		}
	}
	println(count)
}

func Solve() {
	PartOne()
	PartTwo()
}
