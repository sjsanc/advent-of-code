module advent_of_code._2023.Day03.Solution

open System
open System.Text.RegularExpressions
open advent_of_code.Lib.Solver

[<Problem("Problem Name", 2023, 03)>]
type Solution() =
        member private this.adjacentIndices idx len offset maxVal =
            let lower = [idx - offset - 1 .. idx - offset + len]
            let upper = [idx + offset - 1 .. idx + offset + len]
            let left = if (idx - offset) % offset = 0 then -1 else (idx - 1)
            let right = if (idx + len) % offset = 0 then -1 else (idx + len)
            List.concat [lower; upper; [left]; [right]]
            |> List.filter (fun x -> x >= 0 && x <= maxVal)

        member private this.GetParts (input: seq<Match>) width all =
            input
            |> Seq.fold (fun (width: int, all: string, acc) m ->
                this.adjacentIndices m.Index m.Length width all.Length
                |> List.map (fun idx -> Seq.tryItem idx all) |> Seq.choose id
                |> Seq.exists (fun char -> char <> '.' && not (Char.IsLetterOrDigit char))
                |> function
                | true -> (width, all, acc @ [int m.Value])
                | false -> (width, all, acc)
            ) (width, all, [])
            |> (fun (_, _, i) -> i)
            |> Seq.sum
            
 
        // For each part number, if a gear is found, store the part under that gear's index in a map
        // Then any entry with exactly 2 parts is a correct gear
        member private this.GetGears (input: seq<Match>) (width: int) (all: string) =
            input
            |> Seq.fold (fun acc m ->
                this.adjacentIndices m.Index m.Length width all.Length
                |> List.fold (fun (acc: Map<int, string list>) idx ->
                    match Seq.tryItem idx all with
                    | Some '*' ->
                        match Map.tryFind idx acc with
                        | Some(values) -> Map.add idx (m.Value :: values) acc
                        | None -> Map.add idx [m.Value] acc
                    | _ -> acc
                ) acc
            ) Map.empty
            |> Map.fold (fun acc key values ->
                match values.Length with
                | 2 -> acc + (int values.[0] * int values.[1])
                | _ -> acc
            ) 0
                 
        member private this.Solve (lines: string array) folder =
            let width = lines[0].Length
            let all: string = lines |> String.concat ""

            Regex.Matches(all, @"(\d+)")
            |> Seq.cast<Match>
            |> (fun m -> folder m width all) 
            |> string
            

        interface Solver with
            member this.PartOne input =
                Some (this.Solve input this.GetParts)  
            
            member this.PartTwo input =
                Some (this.Solve input this.GetGears)
