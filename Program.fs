

open System
open System.Diagnostics
open System.IO
open System.Reflection
open Spectre.Console
open advent_of_code.Lib.Solver

let parseArgs (args: string array) =
    let year, day =
        match args.Length with
        | 0 -> failwith "Invalid number of arguments"
        | _ when args.Length >= 2 -> int args.[0], Some (int args.[1])
        | 1 -> int args.[0], None
        | _ -> failwith "Invalid number of arguments"
    year, day

let getSolutionTypes (year: int) (day: int option) =     
    Assembly.GetExecutingAssembly().GetTypes()
    |> Array.filter (fun t ->
        t.IsDefined(typeof<ProblemAttribute>) &&
        match day with
        | Some d -> t.GetCustomAttribute<ProblemAttribute>().Year = year && d = (t.GetCustomAttribute<ProblemAttribute>()).Day
        | None -> t.GetCustomAttribute<ProblemAttribute>().Year = year
    )
    
let loadSolutions (solutionTypes: Type array) =
    solutionTypes
    |> Array.choose (fun t ->
        let instance = Activator.CreateInstance(t)
        match instance with
        | :? Solver as solver -> Some solver
        | _ -> failwith "Type does not implement Solver"
    )

let loadInput (year: int) (day: int) =
    let inputPath = Path.Combine(__SOURCE_DIRECTORY__, $"{year}", $"""Day{ $"%02d{day}"}""", "input")
    printfn $"{inputPath}"
    try File.ReadAllLines(inputPath)
    with
    | ex ->
        printfn "Unable to find input file"
        Array.empty          

let runSolution (solution: Solver) =
    let day = solution.GetType().GetCustomAttribute<ProblemAttribute>().Day
    let year = solution.GetType().GetCustomAttribute<ProblemAttribute>().Year
    let input = loadInput year day
    
    let outputPath = Path.Combine(__SOURCE_DIRECTORY__, $"{year}", $"""Day{ $"%02d{day}"}""", "answers")
    use writer = new StreamWriter(outputPath, true)
    File.WriteAllText(outputPath, "")
    
    let table = Table()
    
    for col in [ "Part"; "Result"; "Elapsed" ] do
        table.AddColumn col |> ignore
    
    let sw1 = Stopwatch.StartNew()
    let resultOne = solution.PartOne input
    sw1.Stop()
    match resultOne with
    | Some resultOne ->
        writer.WriteLine resultOne
        table.AddRow("1", $"{resultOne}", $"{sw1.Elapsed}") |> ignore
    | None -> ()
    
    let sw2 = Stopwatch.StartNew()
    let resultTwo = solution.PartTwo input
    sw2.Stop()
    match resultTwo with
    | Some resultTwo ->
        writer.WriteLine resultTwo
        table.AddRow("2", $"{resultTwo}", $"{sw2.Elapsed}") |> ignore
    | None -> ()
    
    AnsiConsole.Write table
    
let runAllSolutions (solutions: Solver array) =
    solutions
    |> Array.map runSolution

[<EntryPoint>]
let main args =
    let year, day = parseArgs args
   
    getSolutionTypes year day
    |> loadSolutions
    |> runAllSolutions
    |> ignore
    
    0