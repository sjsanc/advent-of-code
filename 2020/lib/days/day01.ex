defmodule Day01 do
  def solve do
    s = Solution.new(1)

    part1 = part1(s)
    part2 = part2(s)

    Solution.write(s, part1, part2)
  end

  defp part1(%Solution{input: _input, lines: _lines}) do
    nil
  end

  defp part2(%Solution{input: _input, lines: _lines}) do
    nil
  end
end
