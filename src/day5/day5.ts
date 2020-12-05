import { getPuzzleInput } from '../util/input.js'

export async function run() {
	const inputs = await getPuzzleInput();

	let seats: number[] = [];

	for (const line of inputs) {
		let row_min = 0;
		let row_dist = 128;
		for (const ch of line.slice(0, 7)) {
			row_dist /= 2;
			if (ch == 'B') {
				row_min += row_dist;
			}
		}

		let col_min = 0;
		let col_dist = 8;
		for (const ch of line.slice(7)) {
			col_dist /= 2;
			if (ch == 'R') {
				col_min = col_min + col_dist;
			}
		}

		seats.push(row_min * 8 + col_min);
	}

	seats.sort((a, b) => a - b);

	console.log("Part 1: ", seats.slice(-1)[0]);
	for (let i = 0; i < seats.length - 1; i++) {
		if (seats[i] + 1 != seats[i+1]) {
			console.log("Part 2: ", seats[i]+1);
		}
	}
}

run();
