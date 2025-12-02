package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

func executeTypeScript(yearDir, day string) (string, string, time.Duration, error) {
	normalizedDay := normalizeDayPadded(day)

	start := time.Now()
	cmd := exec.Command("npm", "run", "solve", "--", normalizedDay)
	cmd.Dir = yearDir
	if err := cmd.Run(); err != nil {
		return "", "", time.Since(start), fmt.Errorf("execution failed: %w", err)
	}
	duration := time.Since(start)

	resultsPath := filepath.Join(yearDir, normalizedDay, "results.txt")
	content, err := os.ReadFile(resultsPath)
	if err != nil {
		return "", "", duration, fmt.Errorf("failed to read results: %w", err)
	}

	lines := strings.Split(string(content), "\n")
	part1 := ""
	part2 := ""

	if len(lines) > 0 {
		part1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		part2 = strings.TrimSpace(lines[1])
	}

	return part1, part2, duration, nil
}

func executeCpp(yearDir, day string) (string, string, time.Duration, error) {
	normalizedDay := normalizeDayPadded(day)

	runScript := filepath.Join(yearDir, "run.sh")
	if _, err := os.Stat(runScript); err != nil {
		return "", "", 0, fmt.Errorf("run.sh not found")
	}

	start := time.Now()
	cmd := exec.Command("./run.sh", normalizedDay)
	cmd.Dir = yearDir
	output, err := cmd.Output()
	duration := time.Since(start)

	if err != nil {
		return "", "", duration, fmt.Errorf("execution failed: %w", err)
	}

	lines := strings.Split(strings.TrimSpace(string(output)), "\n")
	if len(lines) < 2 {
		return "", "", duration, fmt.Errorf("invalid output")
	}

	return strings.TrimSpace(lines[len(lines)-2]), strings.TrimSpace(lines[len(lines)-1]), duration, nil
}

func executeGo(yearDir, day string) (string, string, time.Duration, error) {
	normalizedDay := normalizeDayPadded(day)
	dayInt := normalizeDayInt(day)

	start := time.Now()
	cmd := exec.Command("go", "run", "main.go", "-day", dayInt)
	cmd.Dir = yearDir
	if err := cmd.Run(); err != nil {
		return "", "", time.Since(start), fmt.Errorf("execution failed: %w", err)
	}
	duration := time.Since(start)

	outputPath := filepath.Join(yearDir, normalizedDay, "output.txt")
	content, err := os.ReadFile(outputPath)
	if err != nil {
		return "", "", duration, fmt.Errorf("failed to read output: %w", err)
	}

	lines := strings.Split(strings.TrimSpace(string(content)), "\n")
	if len(lines) < 2 {
		return "", "", duration, fmt.Errorf("invalid output file")
	}

	return strings.TrimSpace(lines[0]), strings.TrimSpace(lines[1]), duration, nil
}
