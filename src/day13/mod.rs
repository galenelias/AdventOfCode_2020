use itertools::Itertools;
use num::integer::lcm;

pub fn solve(inputs: Vec<String>) {
	let buses = inputs[1].split(',').enumerate().filter(|(_, v)| v != &"x").map(|(i, v)| (i, v.parse::<usize>().unwrap())).collect_vec();

	println!("{:?}", buses);

	let first_bus = buses[0].1;
	let (max_bus_idx, max_bus) = buses.iter().max_by_key(|(_, v)| v).unwrap();
	println!("{:?} {}", max_bus, max_bus_idx);

	let mut val = 0;
	println!("Skipping by {}", max_bus);
	loop {
		val += max_bus;
		if ((val - max_bus_idx) % first_bus) != 0 {
			continue;
		}

		let lcm = lcm(first_bus, *max_bus);
		println!("Skipping by {}", lcm);

		loop {
			let mut valid = true;
			for (i, bus) in buses.iter().skip(1) {
				if ((val + i - max_bus_idx) % bus) != 0 {
					valid = false;
					break;
				}
			}

			if valid {
				println!("Part 2: {}", val - max_bus_idx);
				// break;
				return;
			}
			val += lcm;
		}
	}

	// let mut val = 0;
	// loop {
	// 	val += max_bus;
	// 	if ((val - max_bus_idx) % first_bus) != 0 {
	// 		continue;
	// 	}

	// 	let mut valid = true;
	// 	for (i, bus) in buses.iter().skip(1) {
	// 		if ((val + i - max_bus_idx) % bus) != 0 {
	// 			valid = false;
	// 			break;
	// 		}
	// 	}

	// 	if valid {
	// 		println!("Part 2: {}", val - max_bus_idx);
	// 		// break;
	// 	}
	// }
}
