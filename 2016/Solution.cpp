#include "Solution.h"
#include <fstream>
#include <sstream>
#include <iostream>

Solution::Solution(int dayNumber) : day(dayNumber) {
    loadInput();
}

void Solution::loadInput() {
    std::string filename = std::to_string(day);
    if (day < 10) filename = "0" + filename; // pad 01
    filename = filename + "/input.txt";

    std::ifstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Error: could not open" << filename << std::endl;
        return;
    }

    std::stringstream buffer;
    buffer << file.rdbuf();
    input = buffer.str();

    lines = splitLines(input);
}

std::vector<std::string> Solution::splitLines(const std::string& text) {
    std::vector<std::string> result;
    std::stringstream ss(text);
    std::string line;

    while (std::getline(ss, line)) {
        result.push_back(line);
    }

    return result;
}

void Solution::solve() {
    std::cout << "Day" << day << ":" << std::endl;

    std::string result1 = partOne();
    std::cout << " Part 1: " << result1 << std::endl;

    std::string result2 = partTwo();
    std::cout << " Part 2: " << result2 << std::endl;

    writeOutput(result1, result2);
}

void Solution::writeOutput(const std::string& part1, const std::string& part2) {
    std::string filename = std::to_string(day);
    if (day < 10) filename = "0" + filename;
    filename = filename + "/output.txt";

    std::ofstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Error: could not write to " << filename << std::endl;
        return;
    }

    file << part1 << std::endl;
    file << part2 << std::endl;
    file.close();
}