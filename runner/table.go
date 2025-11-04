package main

import (
	"fmt"
	"sort"
)

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
	fmt.Printf("│ Total                              │ %6dms │\n", result.total.Milliseconds())
	fmt.Println("└────────────────────────────────────┴──────────┘")
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
