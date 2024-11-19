#include <iostream>
#include <fstream>
#include <vector>
#include <sstream>
#include <set>

int main()
{
    std::string filepath = "/home/sjsanc/work/advent-of-code/2016/01/input.txt";
    std::ifstream file(filepath);

    if (!file.is_open())
    {
        std::cout << "unable to open file" << std::endl;
        return 1;
    }

    std::string line;
    std::vector<int> pos = {0, 0};
    int current_dir = 0; // north

    std::set<std::vector<int>> visited;
    std::vector<int> first_revisit = {};

    while (std::getline(file, line))
    {
        std::stringstream ss(line);
        std::string token;
        while (std::getline(ss, token, ','))
        {
            size_t start = token.find_first_not_of(" ");
            token = token.substr(start);

            char dir = token[0];
            if (dir == 'R')
                current_dir = (current_dir + 1) % 4;
            else
                current_dir = (current_dir + 3) % 4;

            int steps = std::stoi(token.substr(1));

            for (int i = 0; i < steps; i++)
            {
                if (current_dir == 0)
                    pos[1] += 1;
                else if (current_dir == 1)
                    pos[0] += 1;
                else if (current_dir == 2)
                    pos[1] -= 1;
                else
                    pos[0] -= 1;

                if (visited.find(pos) != visited.end() && first_revisit.empty())
                {
                    first_revisit = pos; // Store the first revisit position
                }

                visited.insert(pos);
            }
        }
    }

    file.close();

    // Manhattan distance
    int distance = std::abs(pos[0] - 0) + std::abs(pos[1] - 0);

    std::cout << "Distance: " << distance << std::endl;

    int revisit_distance = std::abs(first_revisit[0] - 0) + std::abs(first_revisit[1] - 0);

    std::cout << "First: " << revisit_distance << std::endl;

    return 0;
}
