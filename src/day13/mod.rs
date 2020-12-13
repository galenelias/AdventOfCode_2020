use itertools::Itertools;
use num::integer::lcm;

pub fn solve(inputs: Vec<String>) {
	let leave_time = inputs[0].parse::<usize>().unwrap();
	// buses = vector<(index, bus_id)> with 'x' values removed
	let buses = inputs[1].split(',').enumerate().filter(|(_, v)| v != &"x").map(|(i, v)| (i, v.parse::<usize>().unwrap())).collect_vec();

	// Part 1
	let wait_time = |bus_id| (bus_id - (leave_time % bus_id));
	let best_bus_id = buses.iter().min_by_key(|(_, b)| wait_time(b)).unwrap().1;
	println!("Part 1: {:?}", best_bus_id * wait_time(&best_bus_id));

	// Part 2
	let mut val = 0;
	let mut increment = 1;
	for (bus_offset, bus_id) in &buses {
		while ((val + bus_offset) % bus_id) != 0 {
			val += increment;
		}
		increment = lcm(increment, *bus_id);
	}
	println!("Part 2: {}", val);
}
