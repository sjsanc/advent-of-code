module advent_of_code._2023.Day02.Solution

open System.Text.RegularExpressions
open advent_of_code.Lib.Solver

[<Problem("Problem Name", 2023, 02)>]
type Solution() =
    
    member private this.VerifyGame (sets: string) =
        Regex.Matches(sets, @"(\d+) (\w+)")
        |> Seq.cast<Match>
        |> Seq.filter (fun set ->
            let value = int set.Groups.[1].Value 
            match set.Groups.[2].Value with
            | "red" -> value > 12
            | "green" -> value > 13
            | "blue" -> value > 14
            | _ -> false
        )
        |> Seq.length = 0
            
    member private this.Solve (lines: string array) =
        lines
        |> Array.map (fun game ->
            Regex.Matches(game, @"Game (\d+): (.+?)(?=Game|$)")
            |> Seq.cast<Match>
            |> Seq.filter (fun sets -> this.VerifyGame sets.Groups.[2].Value)
            |> Seq.map (fun sets -> int sets.Groups.[1].Value)
            |> Seq.toArray
        )
        |> Array.concat
        |> Array.sum
        |> string
    
    interface Solver with
        member this.PartOne input =
            Some (this.Solve input)
        
        member this.PartTwo input =
            None
            // Some (this.Solve input)
            