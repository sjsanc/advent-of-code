const std = @import("std");
const solution = @import("../solution.zig");

pub fn solve(allocator: std.mem.Allocator) !void {
    var s = try solution.Solution.init(allocator, 2);
    defer s.deinit();

    const part1 = try solvePart1(s.lines);
    const part2 = try solvePart2(s.lines, allocator);

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

fn solvePart2(lines: [][]const u8, allocator: std.mem.Allocator) !i32 {
    var sum: i32 = 0;
    var nums: std.ArrayList(i32) = .empty;
    defer nums.deinit(allocator);

    for (lines) |line| {
        nums.clearRetainingCapacity(); // empty the array
        var it = std.mem.tokenizeScalar(u8, line, '\t');
        while (it.next()) |token| {
            const num = try std.fmt.parseInt(i32, token, 10);
            try nums.append(allocator, num);
        }
        std.mem.sort(i32, nums.items, {}, std.sort.asc(i32));
        for (nums.items, 0..) |num1, i| {
            for (nums.items[i + 1 ..]) |num2| {
                if (@rem(num2, num1) == 0) {
                    sum += @divExact(num2, num1);
                    break;
                }
            }
        }
    }
    return sum;
}
