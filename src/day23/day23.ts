import { getPuzzleInput } from '../util/input.js'

function traverseLL(ll: number[]): number[] {
	let result: number[] = [1];
	for (let i = 1; ll[i] != 1; i = ll[i]) {
		result.push(ll[i]);
	}
	return result;
}

function run_game(cups: number[], is_part1: boolean, cups_fill_amt: number, iterations: number) {
	let ll: number[] = new Array(cups.length+1);
	for (let i = 0; i < cups.length - 1; i++) {
		ll[cups[i]] = cups[i+1];
	}

	if (cups_fill_amt === 0) {
		ll[cups[cups.length - 1]] = cups[0];
	} else {
		for (let i = cups.length + 1; i < cups_fill_amt; ++i) {
			ll[i] = i + 1;
		}

		ll[cups[cups.length - 1]] = cups.length + 1;
		ll[ll.length] = cups[0];
	}

	let current = cups[0];
	for (let move = 0; move < iterations; move++) {
		const card1 = ll[current];
		const card2 = ll[card1];
		const card3 = ll[card2];

		ll[current] = ll[card3]; // Re-link current to the end of our three cup chain

		let dest_cup = current -1;
		if (dest_cup === 0) {
			dest_cup = ll.length - 1;
		}
		while (dest_cup === card1 || dest_cup === card2 || dest_cup === card3) {
			dest_cup = (dest_cup === 1) ? ll.length - 1 : dest_cup - 1;
		}

		ll[card3] = ll[dest_cup];
		ll[dest_cup] = card1;
		current = ll[current];
	}

	if (is_part1) {
		let part1 = traverseLL(ll).slice(1).reduce((acc, v) => acc + v, "");
		console.log("Part 1:", part1);
	} else {
		console.log(`Part 2: ${ll[1] * ll[ll[1]]} (${ll[1]} * ${ll[ll[1]]})`);
	}
}

async function run() {
	const inputs = await getPuzzleInput();
	let cups = inputs[0].split("").map(v => +v);
	run_game(cups, true, 0, 100);
	run_game(cups, false, 1000000, 10000000);
}

run();
