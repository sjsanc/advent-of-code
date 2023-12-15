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
        
        member private this.SolveTwo (input: string array) =
            let rec processLine (lines: string array) (acc: int list) (idx: int) =
                let mult = acc[idx]

                let line = lines[idx]
                let m = Regex.Matches(line, ":\s*([^|]+)\s*\|\s*(\d+.*)$") 
                let w = m[0].Groups.[1].Value.Split([|' '|], System.StringSplitOptions.RemoveEmptyEntries)
                let n = m[0].Groups.[2].Value.Split([|' '|], System.StringSplitOptions.RemoveEmptyEntries)
                let len = (Array.filter (fun x -> Array.exists (fun y -> x = y) w) n).Length
               
                let newAcc = List.mapi (fun i x -> if i > idx && i < idx + 1 + len then x + mult else x) acc
                
                if idx = lines.Length - 1 then acc
                else processLine input newAcc (idx + 1)
            
            let initial = [for _ in 0 .. input.Length - 1 -> 1] 
            let result = processLine input initial 0 |> List.sum
            
            string result
            
             
             
        interface Solver with
            member this.PartOne input =
                Some (this.SolveOne input)
            
            member this.PartTwo input =
                Some (this.SolveTwo input)
 