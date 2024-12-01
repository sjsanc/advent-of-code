package internal

import (
	"fmt"
	"os"
	"strings"
)

type Solution struct {
	day   int
	Input string
	Lines []string
}

func NewSolution(day int) *Solution {
	s := &Solution{day: day}
	s.Load()
	return s
}

func (s *Solution) Load() {
	path := fmt.Sprintf("%02d/input.txt", s.day)
	file, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}

	s.Input = string(file)
	s.Lines = strings.Split(s.Input, "\n")
}

func (s *Solution) Write(one interface{}, two interface{}) {
	path := fmt.Sprintf("%02d/output.txt", s.day)
	file, err := os.Create(path)
	if err != nil {
		panic(err)
	}

	fmt.Println(one)
	fmt.Println(two)

	if _, err := file.WriteString(fmt.Sprintf("%v\n%v\n", one, two)); err != nil {
		panic(err)
	}

	file.Close()
}
