use itertools::Itertools;
use std::collections::HashMap;
use regex::Regex;

fn is_valid_part1(fields: &HashMap<String, String>) -> bool {
	fields.len() == 8 || (fields.len() == 7 && !fields.contains_key(&String::from("cid")))
}

fn is_valid_part2(fields: &HashMap<String, String>) -> bool {
	lazy_static! {
		static ref RE_HCL: Regex = Regex::new(r"^#[0-9a-f]{6}$").unwrap();
		static ref RE_ECL: Regex = Regex::new(r"^(amb|blu|brn|gry|grn|hzl|oth)$").unwrap();
		static ref RE_PID: Regex = Regex::new(r"^[0-9]{9}$").unwrap();
	}

	for (key, value) in fields {
		let valid = match key.as_ref() {
			"byr" => value.parse::<u32>().map_or(false, |year| year >= 1920 && year <= 2002),
			"iyr" => value.parse::<u32>().map_or(false, |year| year >= 2010 && year <= 2020),
			"eyr" => value.parse::<u32>().map_or(false, |year| year >= 2020 && year <= 2030),
			"hgt" => 
				if let Some(height) = value.strip_suffix("cm") {
					height.parse::<u32>().map_or(false, |h| h >= 150 && h <= 193)
				} else if let Some(height) = value.strip_suffix("in") {
					height.parse::<u32>().map_or(false, |h| h >= 59 && h <= 76)
				} else {
					false
				},
			"hcl" => RE_HCL.is_match(value),
			"ecl" => RE_ECL.is_match(value),
			"pid" => RE_PID.is_match(value),
			"cid" => true,
			_ => panic!("Unhandled key {}!", key),
		};
		if !valid {
			return false;
		}
	}

	true
}

pub fn solve(mut inputs: Vec<String>) {
	// Add sentinel to end to maksure final field gets processed
	inputs.push("".to_string());

	let mut valid_part1 = 0;
	let mut valid_part2 = 0;

	let mut fields: HashMap<String, String> = HashMap::new();
	for input in inputs {
		if input.len() > 0 {
			for field in input.split_whitespace() {
				let parts = field.split(':').collect_vec();
				fields.insert(parts[0].to_string(), parts[1].to_string());
			}
		} else {
			if is_valid_part1(&fields) {
				valid_part1 += 1;

				if is_valid_part2(&fields) {
					valid_part2 += 1;
				}
			}

			fields.clear();
		}
	}

	println!("Part 1: {}", valid_part1);
	println!("Part 2: {}", valid_part2);
}