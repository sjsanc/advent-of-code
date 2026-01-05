const std = @import("std");
const solution = @import("../solution.zig");

pub fn solve(allocator: std.mem.Allocator) !void {
    var s = try solution.Solution.init(allocator, 1);
    defer s.deinit();

    const part1 = try solvePart1(s.input);
    const part2 = try solvePart2(s.input);

    try s.write(part1, part2);
}

fn solvePart1(input: []const u8) !i32 {
    var sum: i32 = 0;
    for (input, 0..) |char, i| {
        const digit = try std.fmt.charToDigit(char, 10);
        const next_char = input[(i + 1) % input.len];
        const next = try std.fmt.charToDigit(next_char, 10);

        if (next == digit) {
            sum += digit;
        }
    }
    return sum;
}

fn solvePart2(input: []const u8) !i32 {
    var sum: i32 = 0;
    for (input, 0..) |char, i| {
        const digit = try std.fmt.charToDigit(char, 10);
        const next_char = input[(i + input.len / 2) % input.len];
        const next = try std.fmt.charToDigit(next_char, 10);

        if (next == digit) {
            sum += digit;
        }
    }
    return sum;
}
