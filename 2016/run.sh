#!/bin/bash

# Day must be provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <day>"
    exit 1
fi

# Ensure day is formatted with leading 0
day=$(printf "%02d" $1)

# Ensure day exists
if [ ! -d "$day" ]; then
    echo "Day $day does not exist"
    exit 1
fi

# Ensure main.cpp exists
if [ ! -f "$day/main.cpp" ]; then
    echo "main.cpp does not exist for day $day"
    exit 1
fi

# Create build directory
mkdir -p build

output_path="build/$day"

g++ -std=c++11 -o $output_path $day/main.cpp
if [ $? -ne 0 ]; then
    echo "Compilation failed for $day"
    exit 1
fi

echo "Running Day $day"
$output_path