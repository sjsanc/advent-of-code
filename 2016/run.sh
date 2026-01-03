#!/bin/bash

# Build the project using CMake
build_project() {
    echo "Building Advent of Code 2016..."
    mkdir -p build
    cd build

    # Configure with CMake if needed
    if [ ! -f "Makefile" ]; then
        cmake .. > /dev/null 2>&1
        if [ $? -ne 0 ]; then
            echo "CMake configuration failed"
            cd ..
            exit 1
        fi
    fi

    # Build
    make 2>&1 | grep -E "error:|warning:|Built target"
    if [ ${PIPESTATUS[0]} -ne 0 ]; then
        echo "Build failed"
        cd ..
        exit 1
    fi

    cd ..
}

# Check if executable exists, build if not
if [ ! -f "build/advent-of-code" ]; then
    build_project
fi

# If no arguments, run all days
if [ $# -eq 0 ]; then
    echo "Running all implemented days..."
    ./build/advent-of-code
    exit 0
fi

# If argument provided, validate and run specific day
day=$(printf "%02d" $1)

# Ensure day exists
if [ ! -d "$day" ]; then
    echo "Day $day does not exist"
    exit 1
fi

# Rebuild to ensure latest changes
build_project

echo "Running Day $day..."
./build/advent-of-code $1