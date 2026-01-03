const std = @import("std");
const day01 = @import("01/day.zig");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);

    if (args.len < 2) {
        std.debug.print("Usage: aoc2017 <day>\n", .{});
        return;
    }

    const day = try std.fmt.parseInt(u8, args[1], 10);

    switch (day) {
        1 => try day01.solve(allocator),
        else => {
            std.debug.print("Day {d} not implemented\n", .{day});
        },
    }
}
