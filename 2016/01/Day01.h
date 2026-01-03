#ifndef DAY01_H
#define DAY01_H

#include "../Solution.h"

class Day01 : public Solution {
    public: 
        explicit Day01() : Solution(1) {}

        std::string partOne() override;
        std::string partTwo() override;

    private:
        struct WalkResult {
            std::vector<int> finalPos;
            std::vector<int> firstRevisit;
        };
        WalkResult walk();
};

#endif