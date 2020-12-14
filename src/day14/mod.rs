use itertools::Itertools;
use std::collections::HashMap;

fn part1(inputs: &Vec<String>) {
	let mut mask: Vec<char> = vec![];
	let mut memory: HashMap<u64, u64> = HashMap::new();

	for line in inputs {
		if line.starts_with("mask = ") {
			mask = line.split(" = ").skip(1).next().unwrap().chars().collect_vec();
		} else {
			let parts = line.split(" = ").collect_vec();
			let mut val = parts[1].parse::<u64>().unwrap();
			let addr = parts[0][4..parts[0].len()-1].parse::<u64>().unwrap();

			// Adjust val for mask
			for i in 0..36 {
				let ch = mask[35-i];
				if ch == '1' {
					val |= 1 << i;
				} else if ch == '0' {
					val &= !(1 << i);
				}
			}

			memory.insert(addr, val);
		}
	}

	let sum: u64 = memory.values().sum();
	println!("Part 1: {}", sum);

}

fn part2(inputs: &Vec<String>) {
	let mut mask: Vec<char> = vec![];
	let mut memory: HashMap<u64, u64> = HashMap::new();

	for line in inputs {
		if line.starts_with("mask = ") {
			mask = line.split(" = ").skip(1).next().unwrap().chars().collect_vec();
		} else {
			let parts = line.split(" = ").collect_vec();
			let val = parts[1].parse::<u64>().unwrap();
			let mut addr = parts[0][4..parts[0].len()-1].parse::<u64>().unwrap();

			// Adjust addr for mask 1's
			for i in 0..36 {
				let ch = mask[35-i];
				if ch == '1' {
					addr |= 1 << i;
				}
			}

			// Catalogue X's, then walk through permutations
			let xs = mask.iter().cloned().enumerate().filter(|(_, v)| v == &'X').map(|(i, _)| 35 - i).collect_vec();
			for i in 0..2u64.pow(xs.len() as u32) {
				for (idx, x_pos) in xs.iter().enumerate() {
					if i & (1 << idx) != 0 {
						addr |= 1 << x_pos;
					} else {
						addr &= !(1 << x_pos);
					}
				}
				memory.insert(addr, val);
			}
		}
	}

	let sum: u64 = memory.values().sum();
	println!("Part 2: {}", sum);

}
pub fn solve(inputs: Vec<String>) {
	part1(&inputs);
	part2(&inputs);
}