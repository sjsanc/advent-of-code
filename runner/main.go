package main

import (
	"os"
	"sort"
	"sync"
	"time"
)

func main() {
	args := os.Args[1:]

	var yearFilter, dayFilter string
	if len(args) > 0 {
		yearFilter = args[0]
	}
	if len(args) > 1 {
		dayFilter = args[1]
	}

	harnesses := getHarnesses()

	years := make([]string, 0, len(harnesses))
	for year := range harnesses {
		years = append(years, year)
	}
	sort.Strings(years)

	var wg sync.WaitGroup
	var mu sync.Mutex
	yearResults := make([]YearResult, 0)

	for _, year := range years {
		if yearFilter != "" && year != yearFilter {
			continue
		}

		wg.Add(1)
		go func(y string) {
			defer wg.Done()

			harness := harnesses[y]
			days := harness.DiscoverDays()

			if len(days) == 0 {
				return
			}

			filteredDays := make([]string, 0)
			for _, day := range days {
				if dayFilter != "" && normalizeDayPadded(dayFilter) != day {
					continue
				}
				filteredDays = append(filteredDays, day)
			}

			if len(filteredDays) == 0 {
				return
			}

			var dayWg sync.WaitGroup
			var dayMu sync.Mutex
			dayResults := make([]DayResult, 0, len(filteredDays))
			startTime := time.Now()

			for _, day := range filteredDays {
				dayWg.Add(1)
				go func(d string) {
					defer dayWg.Done()

					part1, part2, duration, err := harness.RunDay(d)

					dayMu.Lock()
					dayResults = append(dayResults, DayResult{
						day:      d,
						part1:    part1,
						part2:    part2,
						duration: duration,
						err:      err,
					})
					dayMu.Unlock()
				}(day)
			}

			dayWg.Wait()
			totalTime := time.Since(startTime)

			mu.Lock()
			yearResults = append(yearResults, YearResult{
				year:     y,
				language: harness.Language(),
				days:     dayResults,
				total:    totalTime,
			})
			mu.Unlock()
		}(year)
	}

	wg.Wait()

	sort.Slice(yearResults, func(i, j int) bool {
		return yearResults[i].year < yearResults[j].year
	})

	for _, result := range yearResults {
		renderTable(result)
	}
}
