use itertools::Itertools;

fn subsolve(inputs: &[u32], k: usize) -> u32 {
	inputs.iter().cloned().combinations(k)
		.find(|v| v.iter().sum::<u32>() == 2020).unwrap()
		.iter().product()
}

pub fn solve(inputs: Vec<String>) {
	let inputs = inputs.iter().map(|line| line.parse::<u32>().unwrap()).collect_vec();
	println!("Part 1: {}", subsolve(&inputs, 2));
	println!("Part 2: {}", subsolve(&inputs, 3));
}