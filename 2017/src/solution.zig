const std = @import("std");

pub const Solution = struct {
    allocator: std.mem.Allocator,
    input: []const u8,
    lines: [][]const u8,
    day: u8,

    pub fn init(allocator: std.mem.Allocator, day: u8) !Solution {
        var path_buf: [256]u8 = undefined;
        const path = try std.fmt.bufPrint(&path_buf, "src/{d:0>2}/input.txt", .{day});

        const file = try std.fs.cwd().openFile(path, .{});
        defer file.close();

        const raw_content = try file.readToEndAlloc(allocator, 1024 * 1024);
        defer allocator.free(raw_content);

        const input = try filterNewlines(allocator, raw_content);
        const lines = try splitLines(allocator, raw_content);

        return .{
            .allocator = allocator,
            .input = input,
            .lines = lines,
            .day = day,
        };
    }

    pub fn deinit(self: Solution) void {
        self.allocator.free(self.input);
        for (self.lines) |line| {
            self.allocator.free(line);
        }
        self.allocator.free(self.lines);
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

fn filterNewlines(allocator: std.mem.Allocator, content: []const u8) ![]const u8 {
    var filtered: std.ArrayList(u8) = .empty;
    defer filtered.deinit(allocator);

    for (content) |char| {
        if (char != '\n' and char != '\r') {
            try filtered.append(allocator, char);
        }
    }

    return filtered.toOwnedSlice(allocator);
}

fn splitLines(allocator: std.mem.Allocator, content: []const u8) ![][]const u8 {
    var list: std.ArrayList([]const u8) = .empty;
    defer list.deinit(allocator);
    var iter = std.mem.splitScalar(u8, content, '\n');

    while (iter.next()) |line| {
        if (line.len == 0) continue;

        const trimmed = if (line.len > 0 and line[line.len - 1] == '\r')
            line[0 .. line.len - 1]
        else
            line;

        const line_copy = try allocator.alloc(u8, trimmed.len);
        @memcpy(line_copy, trimmed);
        try list.append(allocator, line_copy);
    }

    return list.toOwnedSlice(allocator);
}
