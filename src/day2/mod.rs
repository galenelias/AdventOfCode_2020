use itertools::Itertools;
use regex::Regex;

struct PasswordInfo {
	range: [usize;2],
	pwd_letter: char,
	password: Vec<char>,
}

pub fn solve(inputs: Vec<String>) {
	let re_input = Regex::new(r"(\d+)-(\d+) (\w): (\w+)").unwrap();

	let password_specs: Vec<PasswordInfo> = inputs.iter().map(|input| {
		let caps = re_input.captures(&input).unwrap();
		PasswordInfo {
			range: [caps[1].parse::<usize>().unwrap(), caps[2].parse::<usize>().unwrap()],
			pwd_letter: caps[3].chars().next().unwrap(),
			password: caps[4].chars().collect_vec(),
		}
	}).collect();

	let part1 = password_specs.iter().filter(|pwd| {
		let letter_freq = pwd.password.iter().filter(|&ch| ch == &pwd.pwd_letter).count();
		return letter_freq >= pwd.range[0] && letter_freq <= pwd.range[1];
	}).count();

	let part2 = password_specs.iter().filter(|pwd| {
		(pwd.password[pwd.range[0] - 1] == pwd.pwd_letter) != (pwd.password[pwd.range[1] - 1] == pwd.pwd_letter)
	}).count();

	println!("Part 1: {}", part1);
	println!("Part 2: {}", part2);
}