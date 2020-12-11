import { getPuzzleInput } from '../util/input.js'

interface Coord {
	r: number,
	c: number,
}

interface Node {
	pos: Coord,
	dist: number,
}

function get_safe(inputs: string[][], r: number, c: number): string {
	if (r < 0 || r >= inputs.length || c < 0 || c >= inputs[r].length) {
		return '.';
	} else {
		return inputs[r][c];
	}
}

function count_adjacent(inputs: string[][], r: number, c: number): number {
	return (get_safe(inputs, r-1, c-1) == '#' ? 1 : 0) +
		(get_safe(inputs, r-1, c) == '#' ? 1 : 0) +
		(get_safe(inputs, r-1, c+1) == '#' ? 1 : 0) +
		(get_safe(inputs, r, c-1) == '#' ? 1 : 0) +
		(get_safe(inputs, r, c+1) == '#' ? 1 : 0) +
		(get_safe(inputs, r+1, c-1) == '#' ? 1 : 0) +
		(get_safe(inputs, r+1, c) == '#' ? 1 : 0) +
		(get_safe(inputs, r+1, c+1) == '#' ? 1 : 0);
}

function count_adjacent2(inputs: string[][], orig_r: number, orig_c: number): number {
	let count = 0;
	for (let dr of [-1, 0, 1]) {
		for (let dc of [-1, 0, 1]) {
			let r = orig_r;
			let c = orig_c;
			if (dr !== 0 || dc !== 0) {
				r += dr;
				c += dc;

				while (r >= 0 && r < inputs.length && c >= 0 && c < inputs[0].length && inputs[r][c] == '.') {
					r += dr;
					c += dc;
				}
				if (get_safe(inputs, r, c) == '#') {
					count++;
				}
			}
		}
	}

	return count;
}

function print_grid(grid: string[][]) {
	for (const row of grid) {
		console.log(row.join(""));
	}
	console.log();
}

export async function run() {
	let inputs = (await getPuzzleInput()).map(i => i.split(''));
	// let inputs_orig = JSON.stringify(inputs);
	let inputs_orig = inputs.map(row => row.slice());//JSON.stringify(inputs);

	inputs[1][1] = 'x';

	let steps = 0;
	let last: string = "";
	// while (true) {
	// 	steps++;

	// 	let json = JSON.stringify(inputs);
	// 	if (json === last) {
	// 		let seats = 0;
	// 		for (let r = 0; r < inputs.length; r++) {
	// 			for (let c = 0; c < inputs[r].length; c++) {
	// 				if (inputs[r][c] == '#') {
	// 					seats++;
	// 				}
	// 			}
	// 		}
	// 		console.log(`Stabilized after ${steps} steps.  Seats = ${seats}`);

	// 		break;
	// 	} else {
	// 		last = json;
	// 	}

	// 	let newGrid = JSON.parse(json);

	// 	let x = count_adjacent(inputs, 0, 2);

	// 	for (let r = 0; r < inputs.length; r++) {
	// 		for (let c = 0; c < inputs[r].length; c++) {
	// 			const ch = inputs[r][c];

	// 			if (ch == 'L' && count_adjacent(inputs, r, c) == 0) {
	// 				newGrid[r][c] = "#";
	// 			} else if (ch == '#' && count_adjacent(inputs, r, c) >= 4) {
	// 				newGrid[r][c] = 'L';
	// 			}
	// 		}
	// 	}
	// 	inputs = newGrid;

	// print_grid(newGrid);
	//}

	while (true) {
		steps++;

		let json = JSON.stringify(inputs);
		if (json === last) {
			let seats = 0;
			for (let r = 0; r < inputs.length; r++) {
				for (let c = 0; c < inputs[r].length; c++) {
					if (inputs[r][c] == '#') {
						seats++;
					}
				}
			}
			console.log(`Stabilized after ${steps} steps.  Seats = ${seats}`);

			break;
		} else {
			last = json;
		}

		let newGrid = JSON.parse(json);

		let x = count_adjacent2(inputs, 1, 1);

		for (let r = 0; r < inputs.length; r++) {
			for (let c = 0; c < inputs[r].length; c++) {
				const ch = inputs[r][c];

				if (ch == 'L' && count_adjacent2(inputs, r, c) == 0) {
					newGrid[r][c] = "#";
				} else if (ch == '#' && count_adjacent2(inputs, r, c) >= 5) {
					newGrid[r][c] = 'L';
				}
			}
		}
		print_grid(newGrid);
		inputs = newGrid;
	}

	inputs
}

run();
