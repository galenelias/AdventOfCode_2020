fn dxdy_from_dir(dir: char) -> [i64; 2] {
	match dir {
		'N' => [0, -1],
		'E' => [1, 0],
		'S' => [0, 1],
		'W' => [-1, 0],
		_ => panic!(),
	}
}

fn turn_right(dir: char) -> char {
	match dir {
		'N' => 'E',
		'E' => 'S',
		'S' => 'W',
		'W' => 'N',
		_ => panic!(),
	}
}

fn turn_left(dir: char) -> char {
	match dir {
		'N' => 'W',
		'W' => 'S',
		'S' => 'E',
		'E' => 'N',
		_ => panic!(),
	}
}

fn part1(inputs: &Vec<String>) {
	let mut dir = 'E';
	let mut pos = [0i64, 0i64];

	for inputs in inputs {
		let cmd = inputs.chars().next().unwrap();
		let amt = inputs[1..].parse::<i64>().unwrap();

		match cmd {
			'F' => {
				let dxdy = dxdy_from_dir(dir);
				pos = [pos[0] + dxdy[0] * amt, pos[1] + dxdy[1] * amt];
			},
			'L' => for _ in 0..(amt/90) { dir = turn_left(dir) },
			'R' => for _ in 0..(amt/90) { dir = turn_right(dir) },
			'N' | 'E' | 'S' | 'W' => {
				let dxdy = dxdy_from_dir(cmd);
				pos = [pos[0] + dxdy[0] * amt, pos[1] + dxdy[1] * amt];
			},
			_ => panic!("Unexpected command: {}", cmd),
		}
	}
	println!("Part 1: {}", pos[0].abs() + pos[1].abs());
}

fn part2(inputs: &Vec<String>) {
	let mut ship_pos = [0i64, 0i64];
	let mut waypoint_pos = [10i64, -1i64];

	for inputs in inputs {
		let cmd = inputs.chars().next().unwrap();
		let amt = inputs[1..].parse::<i64>().unwrap();

		match cmd {
			'F' => {
				ship_pos[0] += waypoint_pos[0] * amt;
				ship_pos[1] += waypoint_pos[1] * amt;
			},
			'R' => {
				for _ in 0..(amt/90) {
					waypoint_pos = [-waypoint_pos[1], waypoint_pos[0]];
				}
			},
			'L' => {
				for _ in 0..(amt/90) {
					waypoint_pos = [waypoint_pos[1], -waypoint_pos[0]];
				}
			},
			'N' | 'E' | 'S' | 'W' => {
				let dxdy = dxdy_from_dir(cmd);
				waypoint_pos[0] += dxdy[0] * amt;
				waypoint_pos[1] += dxdy[1] * amt;
			},
			_ => panic!("Unexpected command: {}", cmd),
		}
	}
	println!("Part 1: {}", ship_pos[0].abs() + ship_pos[1].abs());
}

pub fn solve(inputs: Vec<String>) {
	part1(&inputs);
	part2(&inputs);
}