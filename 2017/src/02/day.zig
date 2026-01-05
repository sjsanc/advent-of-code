const std = @import("std");
const solution = @import("../solution.zig");

pub fn solve(allocator: std.mem.Allocator) !void {
    var s = try solution.Solution.init(allocator, 2);
    defer s.deinit();

    const part1 = try solvePart1(s.lines);
    const part2 = try solvePart2();

    try s.write(part1, part2);
}

fn solvePart1(lines: [][]const u8) !i32 {
    var sum: i32 = 0;
    for (lines) |line| {
        var max: i32 = 0;
        var min: i32 = std.math.maxInt(i32);
        var it = std.mem.tokenizeScalar(u8, line, '\t');
        while (it.next()) |token| {
            const num = try std.fmt.parseInt(i32, token, 10);
            if (num > max) max = num;
            if (num < min) min = num;
        }
        sum += max - min;
    }
    return sum;
}

fn solvePart2() !i32 {
    return 0;
}
