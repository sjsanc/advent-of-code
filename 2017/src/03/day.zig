const std = @import("std");
const solution = @import("../solution.zig");

pub fn solve(alloc: std.mem.Allocator) !void {
    var s = try solution.Solution.init(alloc, 3);
    defer s.deinit();

    const part1 = try solvePart1(s, alloc);
    const part2 = try solvePart2(s, alloc);

    try s.write(part1, part2);
}

fn solvePart1(s: solution.Solution, alloc: std.mem.Allocator) !i32 {
    _ = alloc;
    const point = try std.fmt.parseInt(i32, s.lines[0], 10);
    if (point == 1) return 0;

    const f = @as(f64, @floatFromInt(point));
    const k = @as(i32, @intFromFloat(std.math.ceil((std.math.sqrt(f) - 1.0) / 2.0)));

    const prev_max = (2 * k - 1) * (2 * k - 1);
    const offset = point - prev_max;
    const side = 2 * k;

    const side_index = @divFloor(offset - 1, side);
    const side_offset = @mod(offset - 1, side);

    var x: i32 = 0;
    var y: i32 = 0;

    switch (side_index) {
        0 => { // right, going up
            x = k;
            y = -k + 1 + side_offset;
        },
        1 => { // top, going left
            x = k - 1 - side_offset;
            y = k;
        },
        2 => { // left, going down
            x = -k;
            y = k - 1 - side_offset;
        },
        else => { // bottom, going right
            x = -k + 1 + side_offset;
            y = -k;
        },
    }

    const distance: i32 = @intCast(@abs(x) + @abs(y));
    return distance;
}

fn solvePart2(s: solution.Solution, alloc: std.mem.Allocator) !i32 {
    _ = s;
    _ = alloc;
    return 0;
}
