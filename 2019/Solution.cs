namespace aoc2019;

public abstract class Solution {
    protected int Day;
    protected string Input;
    protected List<string> Lines;

    private string DayFolder => $"Day{Day:D2}";

    protected Solution(int dayNumber)
    {
        Day = dayNumber;

        var inputPath = Path.Combine(DayFolder, "input.txt");
        Input = File.ReadAllText(inputPath);
        Lines = Input.Split(["\r\n", "\n"], StringSplitOptions.None).ToList();
    }

    abstract public string Part1();
    abstract public string Part2();

    public void Solve()
    {
        var part1 = Part1();
        var part2 = Part2();

        var outputPath = Path.Combine(AppContext.BaseDirectory, DayFolder, "output.txt");

        using var outputFile = File.CreateText(outputPath);
        outputFile.WriteLine(part1);
        outputFile.WriteLine(part2);
    }
}