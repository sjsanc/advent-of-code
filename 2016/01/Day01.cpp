#include "Day01.h"
#include <sstream>
#include <set>
#include <cmath>

Day01::WalkResult Day01::walk() {
    std::vector<int> pos = {0,0};
    int current_dir = 0;

    std::set<std::vector<int>> visited;
    std::vector<int> first_revisit = {};

    std::stringstream ss(input);
    std::string token;

    while (std::getline(ss, token, ',')) {
        size_t start = token.find_first_not_of(" ");
        token = token.substr(start);

        char dir = token[0];
        if (dir == 'R') {
            current_dir = (current_dir + 1) % 4;
        } else {
            current_dir = (current_dir + 3) % 4;
        }

        int steps = std::stoi(token.substr(1));

          for (int i = 0; i < steps; i++) {
              if (current_dir == 0)
                  pos[1] += 1;
              else if (current_dir == 1)
                  pos[0] += 1;
              else if (current_dir == 2)
                  pos[1] -= 1;
              else
                  pos[0] -= 1;

              if (visited.find(pos) != visited.end() && first_revisit.empty()) {
                  first_revisit = pos;
              }

              visited.insert(pos);
          }
    }

    return {pos, first_revisit};
}

std::string Day01::partOne() {
    WalkResult result = walk();
    int distance =std::abs(result.finalPos[0] + std::abs(result.finalPos[1]));
    return std::to_string(distance);
}

std::string Day01::partTwo() {
    WalkResult result = walk();
    int distance = std::abs(result.firstRevisit[0]) + std::abs(result.firstRevisit[1]);
    return std::to_string(distance);
}