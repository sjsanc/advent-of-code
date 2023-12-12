module advent_of_code.Program

open System
open System.Diagnostics
open System.IO
open System.Reflection
open advent_of_code.Lib.Solver

type LoadSolutionError =
    | NoUniqueSolution
    | TypeNotImplementingSolver of string

// Load Solver types from assembly
let loadTypes (year: string) (day: string) =
    Assembly.GetExecutingAssembly().GetTypes()
    |> Array.filter (fun t ->
        t.GetInterfaces()
        |> Array.exists (fun i -> i.Name = "Solver")
        && t.FullName.Contains(year)
        && t.FullName.Contains($"Day{day}")
    )
    
let instantiateSolution (solutionType: Type) =    
    try
        let instance = Activator.CreateInstance(solutionType)
        match instance with
        | :? Solver as solver -> Ok solver
        | _ -> Error (TypeNotImplementingSolver solutionType.FullName)
    with
    | ex -> Error (TypeNotImplementingSolver (ex.ToString()))


let handleLoadError error =
    match error with
    | NoUniqueSolution -> "No unique solution found for the given year and day"
    | TypeNotImplementingSolver typeName -> $"Loaded type '%s{typeName}' does not implement Solver interface"
    |> (fun m -> printfn $"{m}")
    
    
let loadInput (year: string) (day: string) =
    let filePath = Path.Combine(__SOURCE_DIRECTORY__, year, $"Day{day}", "input")
    try File.ReadAllLines(filePath)
    with
    | ex ->
        printfn "Unable to find input file"
        Array.empty
    

let runSolution (solution: Solver) (input: string array) (year: string, day: string) =
    let outFilepath = Path.Combine(__SOURCE_DIRECTORY__, year, $"Day{day}", "answers")

    use writer = new StreamWriter(outFilepath, true)

    // Measure PartOne performance
    let stopwatchPartOne = Stopwatch.StartNew()
    let answerOne = solution.PartOne input
    stopwatchPartOne.Stop()

    // Print and log the results for PartOne
    writer.WriteLine answerOne
    printfn $"{answerOne}"
    printfn "PartOne Elapsed Time: %f seconds" (stopwatchPartOne.Elapsed.TotalSeconds)

    // Measure PartTwo performance
    let stopwatchPartTwo = Stopwatch.StartNew()
    let answerTwo = solution.PartTwo input
    stopwatchPartTwo.Stop()

    // Print and log the results for PartTwo
    writer.WriteLine answerTwo
    printfn $"{answerTwo}"
    printfn "PartTwo Elapsed Time: %f seconds" (stopwatchPartTwo.Elapsed.TotalSeconds)

    ""
    
// [<EntryPoint>]
// let main args =
//     let year, day = args.[0], args.[1] 
//         
//     let solution =
//         loadTypes year day
//         |> function
//         | [| solutionType |] -> instantiateSolution solutionType
//         | _ -> Error NoUniqueSolution
//         
//     let input = loadInput year day
//     
//     match solution with
//     | Ok solution -> runSolution solution input (year, day) |> ignore
//     | Error error -> handleLoadError error
//     
//     0