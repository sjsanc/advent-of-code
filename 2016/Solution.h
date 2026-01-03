#ifndef SOLUTION_H
#define SOLUTION_H

#include <string>
#include <vector>

class Solution {
    protected: 
        std::string input;
        std::vector<std::string> lines;
        int day;

    public:
        explicit Solution(int dayNumber);   // constructor
        virtual ~Solution() = default;      // destructor

        virtual std::string partOne() = 0;
        virtual std::string partTwo() = 0;

        void solve();
        int getDay() const { return day; }  // getter for day filtering

    private:
        void loadInput();
        void writeOutput(const std::string& part1, const std::string& part2);
        std::vector<std::string> splitLines(const std::string& text);
};

#endif // SOLUTION_H