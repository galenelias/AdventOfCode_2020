use itertools::Itertools;

fn traverse_linked_list(ll: &[usize]) -> Vec<usize> {
	let mut result = vec![1];
	let mut i = 1;
	while ll[i] != 1 {
		result.push(ll[i]);
		i = ll[i];
	}
	return result;
}

fn run_game(cups: &[usize], is_part1: bool, cups_fill_amt: usize, iterations: usize) {
	let mut ll: Vec<usize> = vec![0; cups.len() + 1];
	for i in 0..(cups.len()-1) {
		ll[cups[i]] = cups[i+1];
	}

	if cups_fill_amt == 0 {
		ll[cups[cups.len() - 1]] = cups[0];
	} else {
		ll.reserve(cups_fill_amt);
		for i in (cups.len() + 1)..cups_fill_amt {
			ll.push(i + 1);
		}

		ll[cups[cups.len() - 1]] = cups.len() + 1;
		ll.push(cups[0]);
	}

	let mut current = cups[0];
	for _move in 0..iterations {
		let card1 = ll[current];
		let card2 = ll[card1];
		let card3 = ll[card2];

		ll[current] = ll[card3]; // Re-link current to the end of our three cup chain

		let mut destination = current -1;
		if destination == 0 {
			destination = ll.len() - 1;
		}
		while destination == card1 || destination == card2 || destination == card3 {
			destination = if destination == 1 { ll.len() - 1 } else { destination - 1 };
		}

		// Insert three cards after 'destination'
		ll[card3] = ll[destination];  // Card3->next = Destination->next
		ll[destination] = card1; // Destination->next = Card1
		current = ll[current]; // Current = Current->next
	}

	if is_part1 {
		let part1_list = traverse_linked_list(&ll);
		let part1 = part1_list.iter().copied().skip(1).map(|v| v.to_string()).collect_vec().join("");
		println!("Part 1: {}", part1);
	} else {
		println!("Part 2: {} ({} * {})", ll[1] * ll[ll[1]], ll[1], ll[ll[1]]);
	}
}

pub fn solve(inputs: Vec<String>) {
	let cups = inputs[0].chars().map(|ch| ch.to_digit(10).unwrap() as usize).collect_vec();
	run_game(&cups, true, 0, 100);
	run_game(&cups, false, 1000000, 10000000);
}