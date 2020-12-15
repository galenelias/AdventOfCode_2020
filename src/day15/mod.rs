use itertools::Itertools;
use std::collections::HashMap;

pub fn solve(inputs: Vec<String>) {
	let nums = inputs[0].split(',').map(|v| v.parse::<u32>().unwrap()).collect_vec();
	let mut spoke: HashMap<u32, u32> = HashMap::new();

	for i in 0..nums.len()-1 {
		spoke.insert(nums[i], (i + 1) as u32);
	}

	let mut next = nums[nums.len()-1];
	for turn in (nums.len() as u32)..30000000 {
		if turn == 2020  {
			println!("Part 1: {}", next);
		}

		if let Some(last_spoke) = spoke.insert(next, turn) {
			next = turn - last_spoke;
		} else {
			next = 0;
		}
	}
	println!("Part 2: {}", next);
}
