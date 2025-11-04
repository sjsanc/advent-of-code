package main

func getHarnesses() map[string]*Harness {
	return map[string]*Harness{
		"2015": NewHarness("../2015", "TypeScript", "index.ts", []string{"npm"}, executeTypeScript),
		"2016": NewHarness("../2016", "C++", "main.cpp", []string{}, executeCpp),
		"2024": NewHarness("../2024", "Go", "day.go", []string{"go"}, executeGo),
	}
}
