#!/bin/bash

cd runner
go build -o advent-of-code

if [ $? -ne 0 ]; then
    echo "Build failed"
    exit 1
fi

./advent-of-code "$@"
