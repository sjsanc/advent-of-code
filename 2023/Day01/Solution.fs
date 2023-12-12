module advent_of_code._2023.Day01.Solution

open System
open System.Text.RegularExpressions
open advent_of_code.Lib.Solver
    

[<Problem("Problem Name", 2023, 01)>]
type Solution() =
    member private this.ParseAsInt (word: string): string =
        match word with
        | "one" -> "1"
        | "two" -> "2"
        | "three" -> "3"
        | "four" -> "4"
        | "five" -> "5"
        | "six" -> "6"
        | "seven" -> "7"
        | "eight" -> "8"
        | "nine" -> "9"
        | _ -> word
    
    member private this.Solve (lines: string array) (rgx: string) =
        lines
        |> Array.map (fun l ->
            Regex.Matches(l, rgx)
            |> Seq.cast<Match>
            |> Seq.map (fun m -> m.Groups.[1].Value |> this.ParseAsInt)
            |> List.ofSeq
            |> (fun l ->
                match l with
                | [x] -> $"{x}{x}"
                | xs -> $"{List.head xs}{List.last xs}"
            )
            |> int
        )
        |> Array.sum
        |> string
          
    interface Solver with
        member this.PartOne input =
            Some (this.Solve input @"(\d)")
        
        member this.PartTwo input =
            Some (this.Solve input @"(?=(one|two|three|four|five|six|seven|eight|nine|\d))")
            