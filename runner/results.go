package main

import "time"

type DayResult struct {
	day      string
	part1    string
	part2    string
	duration time.Duration
	err      error
}

type YearResult struct {
	year     string
	language string
	days     []DayResult
	total    time.Duration
}
