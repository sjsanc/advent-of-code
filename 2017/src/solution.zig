const std = @import("std");

pub const Solution = struct {
    allocator: std.mem.Allocator,
    input: []const u8,
    day: u8,

    pub fn init(allocator: std.mem.Allocator, day: u8) !Solution {
        const input = try readInputFile(allocator, day);
        return .{
            .allocator = allocator,
            .input = input,
            .day = day,
        };
    }

    pub fn lines(self: Solution) ![][]const u8 {
        return splitLines(self.allocator, self.input);
    }

    pub fn write(self: Solution, part1: anytype, part2: anytype) !void {
        var path_buf: [256]u8 = undefined;
        const path = try std.fmt.bufPrint(&path_buf, "src/{d:0>2}/output.txt", .{self.day});

        const file = try std.fs.cwd().createFile(path, .{});
        defer file.close();

        var buffer: [4096]u8 = undefined;
        var writer = file.writer(&buffer);

        try writer.interface.print("Part 1: {any}\n", .{part1});
        try writer.interface.print("Part 2: {any}\n", .{part2});
        try writer.interface.flush();
    }
};

fn readInputFile(allocator: std.mem.Allocator, day: u8) ![]const u8 {
    var path_buf: [256]u8 = undefined;
    const path = try std.fmt.bufPrint(&path_buf, "src/{d:0>2}/input.txt", .{day});

    const file = try std.fs.cwd().openFile(path, .{});
    defer file.close();

    const content = try file.readToEndAlloc(allocator, 1024 * 1024);
    defer allocator.free(content);

    // Filter out newlines
    var filtered: std.ArrayList(u8) = .{};
    for (content) |char| {
        if (char != '\n') {
            try filtered.append(allocator, char);
        }
    }

    return filtered.toOwnedSlice(allocator);
}

fn splitLines(allocator: std.mem.Allocator, input: []const u8) ![][]const u8 {
    var list: std.ArrayList([]const u8) = .{};
    var iter = std.mem.splitScalar(u8, input, '\n');

    while (iter.next()) |line| {
        try list.append(allocator, line);
    }

    return list.toOwnedSlice(allocator);
}
