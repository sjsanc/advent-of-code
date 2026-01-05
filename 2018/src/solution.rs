use std::fs;
use std::io::Write;

pub struct Solution {
    pub day: u8,
    pub input: String,
    pub lines: Vec<String>,   
}

impl Solution {
    pub fn new(day: u8) -> Self {
        let path = format!("src/day{:02}/input.txt", day);
        let input = fs::read_to_string(&path)
            .unwrap_or_else(|_| panic!("Failed to read {}", path))
            .trim()
            .to_string();
        let lines: Vec<String> = input.lines().map(|s| s.to_string()).collect();

        Self { day, input, lines }
    }

    pub fn write<T: std::fmt::Display, U: std::fmt::Display>(&self, part1: T, part2: U) {
        let path = format!("src/day{:02}/output.txt", self.day);
        let mut file = fs::File::create(&path)
            .unwrap_or_else(|_| panic!("Failed to create {}", path));

        writeln!(file, "{}", part1).unwrap();
        writeln!(file, "{}", part2).unwrap();

        println!("Part 1: {}", part1);
        println!("Part 2: {}", part2);
    }
}