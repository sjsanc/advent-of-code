defmodule Aoc2020 do
  def main(args \\ []) do
    case args do
      [day_str] ->
        day = String.to_integer(day_str)
        run_day(day)

      _ ->
        IO.puts("Usage: mix run -e 'Aoc2020.main([\"1\"]'")
    end
  end

  defp run_day(day) do
    case day do
      1 -> Day01.solve()
      _ -> IO.puts("Day #{day} not implemented")
    end
  end
end
