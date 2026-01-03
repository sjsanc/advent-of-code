#include <iostream>
#include <memory>
#include <vector>
#include "01/Day01.h"

int main(int argc, char* argv[]) {
    int selectedDay = -1;
    if (argc > 1) {
        selectedDay = std::stoi(argv[1]);
    }

    std::vector<std::unique_ptr<Solution>> solutions;
    solutions.push_back(std::make_unique<Day01>());

    for (const auto& solution : solutions) {
        // If a specific day is selected, only run that day
        if (selectedDay == -1 || solution->getDay() == selectedDay) {
            solution->solve();
        }
    }

    return 0;
}