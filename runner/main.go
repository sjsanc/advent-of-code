package main

import (
	"flag"
	"fmt"
	"os"
	"os/exec"
)

// Test runner should expose a CLI for running each year, day and part
// e.g.
// - go run main.go 2021 1 1	(run day 1 part 1)
// - go run main.go 2021 		(run all days)
// - go run main.go 			(run all years and days)

// The test runner should time the execution of each part
// The test runner should be able to excute each year, day and part in parallel

func main() {
	var year, day, part string
	flag.StringVar(&year, "year", "", "Year (e.g., 2021)")
	flag.StringVar(&day, "day", "", "Day (e.g., 1)")
	flag.StringVar(&part, "part", "", "Part (e.g., 1)")

	flag.Parse()

	dirs, err := os.ReadDir("../")
	if err != nil {
		panic(err)
	}

	// fmt.Println(year, day, part)

	for _, dir := range dirs {
		fmt.Println(dir.Name())

		if dir.Name() == "2015" {
			cmd := exec.Command("npm", "run", "solve", "--", day)
			stdout, err := cmd.Output()
			if err != nil {
				panic(err)
			}
			fmt.Println(string(stdout))
		}
	}
}
