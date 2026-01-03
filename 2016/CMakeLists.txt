cmake_minimum_required(VERSION 3.10)
project(AdventOfCode2016)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Collect source files
set(SOURCES
    Solution.cpp
    01/Day01.cpp
    # Add future days here:
    # 02/Day02.cpp
    # 03/Day03.cpp
    # etc.
)

# Create executable
add_executable(advent-of-code main.cpp ${SOURCES})

# Enable compiler warnings
if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    target_compile_options(advent-of-code PRIVATE -Wall -Wextra -Wpedantic)
endif()
