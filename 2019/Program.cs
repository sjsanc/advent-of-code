
using aoc2019.Day01;

if (args.Length < 1)
{
    Console.WriteLine("Usage: <day> [part]");
    return;
}

var day = int.Parse(args[0]);

var solution = day switch
{
    1 => new Day01(),
    _ => throw new Exception($"Day {day} not implemented")
};
    
solution.Solve();