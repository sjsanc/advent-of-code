module advent_of_code.Lib.Solver

type Solver = 
    abstract member PartOne : string array -> string
    abstract member PartTwo : string array -> string option
