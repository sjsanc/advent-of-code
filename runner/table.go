package main

import (
	"fmt"
	"sort"
	"sync"
	"time"
)

// LiveTable manages a table that updates in real-time
type LiveTable struct {
	year     string
	language string
	days     []string
	results  map[string]*DayResult
	mu       sync.Mutex
	startRow int // Track where the table starts (after header)
}

// NewLiveTable creates a new live table and displays the initial structure
func NewLiveTable(year, language string, days []string) *LiveTable {
	sort.Strings(days)

	lt := &LiveTable{
		year:     year,
		language: language,
		days:     days,
		results:  make(map[string]*DayResult),
	}

	lt.renderInitial()
	return lt
}

// renderInitial draws the initial table with all days pending
func (lt *LiveTable) renderInitial() {
	fmt.Printf("\nYear %s (%s)\n", lt.year, lt.language)
	fmt.Println("┌─────┬──────────────┬──────────────┬──────────┐")
	fmt.Println("│ Day │ Part 1       │ Part 2       │ Time     │")
	fmt.Println("├─────┼──────────────┼──────────────┼──────────┤")

	for _, day := range lt.days {
		fmt.Printf("│ %s  │ %-12s │ %-12s │ %8s │\n", day, "...", "...", "...")
	}

	fmt.Println("├─────┴──────────────┴──────────────┼──────────┤")
	fmt.Printf("│ Total                             │ %8s  │\n", "...")
	fmt.Println("└─────┴──────────────┴──────────────┴──────────┘")
}

// UpdateDay updates a specific day's result and redraws that row
func (lt *LiveTable) UpdateDay(day string, result DayResult) {
	lt.mu.Lock()
	defer lt.mu.Unlock()

	lt.results[day] = &result

	// Find the row index for this day
	rowIdx := -1
	for i, d := range lt.days {
		if d == day {
			rowIdx = i
			break
		}
	}

	if rowIdx == -1 {
		return
	}

	// Calculate how many lines to move up
	// We need to go past: total row (2 lines), all days below this one (1 line each), and footer (1 line)
	linesToMoveUp := (len(lt.days) - rowIdx) + 3

	// Move cursor up
	fmt.Printf("\033[%dA", linesToMoveUp)
	// Move to start of line
	fmt.Print("\r")

	// Redraw this day's row
	if result.err != nil {
		errMsg := truncate(result.err.Error(), 42)
		fmt.Printf("│ %s  │ ERROR: %-35s │\n", day, errMsg)
	} else {
		part1 := truncate(result.part1, 12)
		part2 := truncate(result.part2, 12)
		fmt.Printf("│ %s  │ %-12s │ %-12s │ %6dms │\n",
			day, part1, part2, result.duration.Milliseconds())
	}

	// Move cursor back down (one less than we moved up since we printed one line)
	fmt.Printf("\033[%dB", linesToMoveUp-1)
}

// Finalize updates the total time and moves cursor to after the table
func (lt *LiveTable) Finalize(totalTime time.Duration) {
	lt.mu.Lock()
	defer lt.mu.Unlock()

	// Move cursor up to the total row (3 lines: footer, total, separator)
	fmt.Printf("\033[3A")
	fmt.Print("\r")

	// Redraw total row
	fmt.Printf("│ Total                             │ %6dms  │\n", totalTime.Milliseconds())
	fmt.Println("└─────┴──────────────┴──────────────┴──────────┘")
}

func renderTable(result YearResult) {
	fmt.Printf("\nYear %s (%s)\n", result.year, result.language)

	sort.Slice(result.days, func(i, j int) bool {
		return result.days[i].day < result.days[j].day
	})

	fmt.Println("┌─────┬──────────────┬──────────────┬──────────┐")
	fmt.Println("│ Day │ Part 1       │ Part 2       │ Time     │")
	fmt.Println("├─────┼──────────────┼──────────────┼──────────┤")

	for _, day := range result.days {
		if day.err != nil {
			errMsg := truncate(day.err.Error(), 42)
			fmt.Printf("│ %s  │ ERROR: %-35s │\n", day.day, errMsg)
		} else {
			part1 := truncate(day.part1, 12)
			part2 := truncate(day.part2, 12)
			fmt.Printf("│ %s  │ %-12s │ %-12s │ %6dms │\n",
				day.day, part1, part2, day.duration.Milliseconds())
		}
	}

	fmt.Println("├─────┴──────────────┴──────────────┼──────────┤")
	fmt.Printf("│ Total                             │ %6dms  │\n", result.total.Milliseconds())
	fmt.Println("└─────┴──────────────┴──────────────┴──────────┘")
}

func truncate(s string, maxLen int) string {
	if len(s) <= maxLen {
		return s
	}
	if maxLen <= 3 {
		return s[:maxLen]
	}
	return s[:maxLen-3] + "..."
}
