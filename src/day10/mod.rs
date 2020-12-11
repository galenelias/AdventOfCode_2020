use itertools::Itertools;
use std::collections::HashMap;

fn subsolve(mut memo: &mut HashMap<usize, u64>, inputs: &[u64], start: usize) -> u64 {
	if start == inputs.len() - 1 {
		return 1;
	}

	if let Some(m) = memo.get(&start) {
		return *m;
	}

	let mut sum = 0;
	for i in 1..=3 {
		if start + i < inputs.len() && inputs[start + i] - inputs[start] <= 3 {
			sum += subsolve(&mut memo, inputs, start + i);
		}
	}

	memo.insert(start, sum);
	return sum;
}

pub fn solve(inputs: Vec<String>) {
	let mut inputs = inputs.iter().map(|i| i.parse::<u64>().unwrap()).collect_vec();

	inputs.push(0); // outlet
	inputs.sort();
	inputs.push(inputs[inputs.len()-1] + 3); // device

	let mut jolts = [0; 4];
	for i in 0..inputs.len() - 1 {
		jolts[(inputs[i+1] - inputs[i]) as usize] += 1;
	}
	println!("Part 1: {}", jolts[1] * jolts[3]);

	let mut memo: HashMap<usize, u64> = HashMap::new();
	println!("Part 2: {}", subsolve(&mut memo, &inputs, 0));
}
