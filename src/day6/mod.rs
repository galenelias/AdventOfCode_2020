use itertools::Itertools;

pub fn solve(mut inputs: Vec<String>) {
	inputs.push(String::from(""));

	let inputs = inputs.iter().map(|line| line.chars().collect_vec()).collect_vec();

	let mut part1 = 0;
	let mut part2 = 0;
	let mut letter_freqs = [0; 26];
	let mut group_size = 0;

	for line in inputs {
		if line.len() > 0 {
			group_size += 1;
			for ch in line {
				letter_freqs[ch as usize - 'a' as usize] += 1;
			}
		} else if group_size > 0 {
			part1 += letter_freqs.iter().filter(|&c| *c > 0).count();
			part2 += letter_freqs.iter().filter(|&c| *c == group_size).count();

			group_size = 0;
			letter_freqs = [0; 26];
		}
	}

	println!("Part 1: {}", part1);
	println!("Part 2: {}", part2);
}
