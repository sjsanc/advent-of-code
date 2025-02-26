package Day04

import (
	"aoc2024/internal"
	"fmt"
	"strings"
)

var solution = internal.NewSolution(4)

func reverse(s string) string {
	runes := []rune(s)
	n := len(runes)
	for i := 0; i < n/2; i++ {
		runes[i], runes[n-1-i] = runes[n-1-i], runes[i]
	}
	return string(runes)
}

// Finding diagonals...

func PartOne() {
	lines := solution.Lines
	height := len(lines)
	width := len(lines[0])
	count := 0

	for i := 0; i < height; i++ {
		count += strings.Count(lines[i], "XMAS")
		count += strings.Count(reverse(lines[i]), "XMAS")
	}

	for j := 0; j < width; j++ {
		l := strings.Builder{}
		for i := 0; i < height; i++ {
			l.WriteByte(lines[i][j])
		}
		count += strings.Count(l.String(), "XMAS")
		count += strings.Count(reverse(l.String()), "XMAS")
	}

	// Top-left to bottom-right
	for i := 0; i < width; i++ {
		l := strings.Builder{}
		for x, y := 0, i; x < height && y < width; x, y = x+1, y+1 {
			l.WriteByte(lines[x][y])
		}
		count += strings.Count(l.String(), "XMAS") + strings.Count(reverse(l.String()), "XMAS")
	}
	for i := 1; i < height; i++ {
		l := strings.Builder{}
		for x, y := i, 0; x < height && y < width; x, y = x+1, y+1 {
			l.WriteByte(lines[x][y])
		}
		count += strings.Count(l.String(), "XMAS") + strings.Count(reverse(l.String()), "XMAS")
	}

	// Bottom-left to top-right
	for i := 0; i < width; i++ {
		l := strings.Builder{}
		for x, y := 0, i; x < height && y >= 0; x, y = x+1, y-1 {
			l.WriteByte(lines[x][y])
		}
		count += strings.Count(l.String(), "XMAS") + strings.Count(reverse(l.String()), "XMAS")
	}
	for i := 1; i < height; i++ {
		l := strings.Builder{}
		for x, y := i, width-1; x < height && y >= 0; x, y = x+1, y-1 {
			l.WriteByte(lines[x][y])
		}
		count += strings.Count(l.String(), "XMAS") + strings.Count(reverse(l.String()), "XMAS")
	}

	fmt.Println(count)
}

func PartTwo() {
	lines := solution.Lines
	height := len(lines) - 1
	width := len(lines[0]) - 1
	count := 0

	for i := 0; i < height; i++ {
		for j := 0; j < width; j++ {
			box := strings.Builder{}
			if i-1 < 0 || j-1 < 0 || i+1 > height || j+1 > width {
				continue
			}
			if lines[i][j] != 'A' {
				continue
			}
			box.WriteByte(lines[i-1][j-1])
			box.WriteByte(lines[i-1][j+1])
			box.WriteByte(lines[i][j])
			box.WriteByte(lines[i+1][j-1])
			box.WriteByte(lines[i+1][j+1])

			s := box.String()
			if s == "SSAMM" || s == "MMASS" || s == "SMASM" || s == "MSAMS" {
				count++
			}
		}
	}

	fmt.Println(count)
}

func Solve() {
	PartOne()
	PartTwo()
}
