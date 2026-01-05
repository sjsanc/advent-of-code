use std::env;

mod solution;
mod day01;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        eprintln!("Usage: {} <day>", args[0]);
        std::process::exit(1);
    }

    let day: u8 = args[1].parse()
        .unwrap_or_else(|_| {
            eprintln!("Invalid day number: {}", args[1]);
            std::process::exit(1);
        });

    println!("Day {}", day);

    match day {
        1 => day01::solve(),
        _ => println!("Day {} not implemented", day)
    }
}
