module advent_of_code._2023.Day03.Solution

open System
open System.Text.RegularExpressions
open advent_of_code.Lib.Solver

[<Problem("Problem Name", 2023, 03)>]
type Solution() =
    member private this.Solve (lines: string array) =
        let width = lines[0].Length
        let all = lines |> String.concat ""
        let offsets = [1; width + 1; width; width - 1; -1; -(width) - 1; -(width); -(width) + 1]
        
        Regex.Matches(all, @"\d+")
        |> Seq.cast<Match>
        |> Seq.mapi (fun _ numMatch ->
            numMatch.Value
            |> Seq.mapi (fun i d ->
                offsets
                |> List.map (fun o -> Seq.tryItem (numMatch.Index + i + o) all)
                |> Seq.choose id
                |> Seq.exists (fun char -> char <> '.' && (not (Char.IsLetterOrDigit char)))
            )
            |> Seq.exists (fun e -> e = true)
            |> function
            | true -> int numMatch.Value
            | _ -> 0
        )
        |> Seq.sum
        |> string

    interface Solver with
        member this.PartOne input =
            Some (this.Solve input) 
            // None
        
        member this.PartTwo input =
            // Some (this.SolveTwo input)
            None