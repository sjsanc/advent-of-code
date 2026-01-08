defmodule Solution do
  defstruct [:day, :input, :lines]

  def new(day) do
    path = "inputs/#{String.pad_leading(to_string(day), 2, "0")}/input.txt"
    input = File.read!(path) |> String.trim()
    lines = String.split(input, "\n")

    %Solution{day: day, input: input, lines: lines}
  end

  def write(%Solution{day: day}, part1, part2) do
    path = "inputs/#{String.pad_leading(to_string(day), 2, "0")}/output.txt"

    IO.puts("Part 1: #{part1}")
    IO.puts("Part 2: #{part2}")

    File.write!(path, "#{part1}\n#{part2}\n")
  end
end
