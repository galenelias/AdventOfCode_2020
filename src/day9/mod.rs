use itertools::Itertools;

const WINDOW: usize = 25;

fn find_part1(inputs: &[u64]) -> u64 {
	'outer: for i in WINDOW..inputs.len() {
		for j in i-WINDOW..i-1 {
			for k in j+1..i {
				if inputs[j] + inputs[k] == inputs[i] && inputs[j] != inputs[k] {
					continue 'outer;
				}
			}
		}

		return inputs[i];
	}
	unreachable!("Failed to find part 1");
}

pub fn solve(inputs: Vec<String>) {
	let inputs = inputs.iter().map(|i| i.parse::<u64>().unwrap()).collect_vec();
	let part1 = find_part1(&inputs);

	let mut j = 0;
	let mut k = 0;
	let mut sum = 0;
	// Sliding sum window. Extend if sum is too low, contract if too high
	while sum != part1 {
		if sum < part1 {
			sum += inputs[k];
			k += 1;
		} else {
			sum -= inputs[j];
			j += 1;
		}
	}

	println!("Part 1: {}", part1);
	let jk_slice = &inputs[j..k];
	println!("Part 2: {}", jk_slice.iter().min().unwrap() + jk_slice.iter().max().unwrap());
}