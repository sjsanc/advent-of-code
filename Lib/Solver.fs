module advent_of_code.Lib.Solver

open System

type ProblemAttribute(name: string, year: int, day: int) =
    inherit Attribute()
    member this.Name = name
    member this.Year = year
    member this.Day = day

type Solver = 
    abstract member PartOne : string array -> string option
    abstract member PartTwo : string array -> string option
