use itertools::Itertools;

pub fn solve(inputs: Vec<String>) {
	let inputs = inputs.iter().map(|line| line.chars().collect_vec()).collect_vec();
	let mut seats: Vec<usize> = Vec::new();

	for line in inputs {
		let mut row_min = 0;
		let mut row_dist = 128;
		for ch in &line[0..7] {
			row_dist /= 2;
			if ch == &'B' {
				row_min += row_dist;
			}
		}

		let mut col_min = 0;
		let mut col_dist = 8;
		for ch in &line[7..] {
			col_dist /= 2;
			if ch == &'R' {
				col_min += col_dist;
			}
		}

		seats.push(row_min * 8 + col_min);
	}

	seats.sort();

	println!("Part 1: {}", &seats.last().unwrap());
	for i in 0..seats.len()-1 {
		if seats[i] + 1 != seats[i+1] {
			println!("Part 2: {}", seats[i]+1);
		}
	}
}
