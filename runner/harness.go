package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strconv"
	"time"
)

type ExecuteFunc func(yearDir, day string) (part1, part2 string, duration time.Duration, err error)

type Harness struct {
	yearDir        string
	language       string
	dayFilePattern string
	requiredCmds   []string
	executeFunc    ExecuteFunc
}

func NewHarness(yearDir, language, dayFilePattern string, requiredCmds []string, executeFunc ExecuteFunc) *Harness {
	return &Harness{
		yearDir:        yearDir,
		language:       language,
		dayFilePattern: dayFilePattern,
		requiredCmds:   requiredCmds,
		executeFunc:    executeFunc,
	}
}

func (h *Harness) Language() string {
	return h.language
}

func (h *Harness) DiscoverDays() []string {
	entries, err := os.ReadDir(h.yearDir)
	if err != nil {
		return []string{}
	}

	days := []string{}
	for _, entry := range entries {
		if entry.IsDir() && len(entry.Name()) == 2 {
			if _, err := strconv.Atoi(entry.Name()); err == nil {
				dayFilePath := filepath.Join(h.yearDir, entry.Name(), h.dayFilePattern)
				if _, err := os.Stat(dayFilePath); err == nil {
					days = append(days, entry.Name())
				}
			}
		}
	}
	sort.Strings(days)
	return days
}

func (h *Harness) RunDay(day string) (string, string, time.Duration, error) {
	for _, cmd := range h.requiredCmds {
		if err := checkCommand(cmd); err != nil {
			return "", "", 0, fmt.Errorf("%s not found: %w", cmd, err)
		}
	}
	return h.executeFunc(h.yearDir, day)
}

func normalizeDayPadded(day string) string {
	dayInt, _ := strconv.Atoi(day)
	return fmt.Sprintf("%02d", dayInt)
}

func normalizeDayInt(day string) string {
	dayInt, _ := strconv.Atoi(day)
	return strconv.Itoa(dayInt)
}

func checkCommand(name string) error {
	_, err := exec.LookPath(name)
	return err
}
