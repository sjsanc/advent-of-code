module advent_of_code._2023.Day04.Solution

open System.Text.RegularExpressions
open advent_of_code.Lib.Solver

[<Problem("Problem Name", 2023, 04)>]
type Solution() =
        member private this.SolveOne (input: string array) =
             input
             |> Array.fold (fun acc line ->
                Regex.Matches(line, ":\s*([^|]+)\s*\|\s*(\d+.*)$")
                |> Seq.cast<Match>
                |> Seq.fold (fun acc m ->
                    let w = m.Groups.[1].Value.Split([|' '|], System.StringSplitOptions.RemoveEmptyEntries)
                    let n = m.Groups.[2].Value.Split([|' '|], System.StringSplitOptions.RemoveEmptyEntries)
                    let intersect = Array.filter (fun x -> Array.exists (fun y -> x = y) w) n
                    acc + 1 * (pown 2 (intersect.Length - 1))
                ) 0
                |> (fun i -> acc + i)
             ) 0
             |> string
             
             
        member private this.GetWinnings (line: seq<Match>) =
            line
            |> Seq.fold (fun acc m ->
                let w = m.Groups.[1].Value.Split([|' '|], System.StringSplitOptions.RemoveEmptyEntries)
                let n = m.Groups.[2].Value.Split([|' '|], System.StringSplitOptions.RemoveEmptyEntries)
                (Array.filter (fun x -> Array.exists (fun y -> x = y) w) n).Length                       
            ) 0
             
        member private this.SolveTwo (input: string array) =
            input
             |> Array.fold (fun acc line ->
                Regex.Matches(line, ":\s*([^|]+)\s*\|\s*(\d+.*)$")
                |> Seq.cast<Match>
                |> this.GetWinnings
                |> (fun i -> acc + i)
             ) 0
             |> string
             
        interface Solver with
            member this.PartOne input =
                Some (this.SolveOne input)
            
            // For each line, calculate winnings as the length of the intersecting numbers
            
            member this.PartTwo input =
                Some (this.SolveTwo input)
    
        

