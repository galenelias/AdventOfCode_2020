import { getPuzzleInput } from '../util/input.js'

function is_outside(inputs: string[][], r: number, c: number): boolean {
	return r < 0 || r >= inputs.length || c < 0 || c >= inputs[r].length;
}

function get(inputs: string[][], r: number, c: number): string {
	if (is_outside(inputs, r, c)) {
		return 'L';
	} else {
		return inputs[r][c];
	}
}

function count_seats(grid: string[][]): number {
	let seats = 0;
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[r].length; c++) {
			if (grid[r][c] == '#') {
				seats++;
			}
		}
	}
	return seats;
}

function count_adjacent(inputs: string[][], r: number, c: number): number {
	let count = 0;
	for (let dr of [-1, 0, 1]) {
		for (let dc of [-1, 0, 1]) {
			if ((dr != 0 || dc != 0) && get(inputs, r + dr, c + dc) == '#') {
				count += 1;
			}
		}
	}
	return count;
}

function count_adjacent2(inputs: string[][], in_r: number, in_c: number): number {
	let count = 0;
	for (let dr of [-1, 0, 1]) {
		for (let dc of [-1, 0, 1]) {
			let r = in_r;
			let c = in_c;
			if (dr !== 0 || dc !== 0) {
				r += dr;
				c += dc;

				// Project along dr/dc vector until we hit a non-blank
				while (!is_outside(inputs, r, c) && inputs[r][c] == '.') {
					r += dr;
					c += dc;
				}

				if (get(inputs, r, c) == '#') {
					count++;
				}
			}
		}
	}

	return count;
}

function part1(grid: string[][]) {
	let steps = 0;
	let last_json = "";
	do {
		steps++;
		last_json = JSON.stringify(grid);

		let newGrid = grid.map(row => row.slice()); // clone grid
		for (let r = 0; r < grid.length; r++) {
			for (let c = 0; c < grid[r].length; c++) {
				const ch = grid[r][c];
				if (ch == 'L' && count_adjacent(grid, r, c) == 0) {
					newGrid[r][c] = "#";
				} else if (ch == '#' && count_adjacent(grid, r, c) >= 4) {
					newGrid[r][c] = 'L';
				}
			}
		}
		grid = newGrid;
	} while (JSON.stringify(grid) != last_json);

	console.log(`Stabilized after ${steps} steps.  Seats = ${count_seats(grid)}`);
}

function part2(grid: string[][]) {
	let steps = 0;
	let last_json = "";

	do {
		steps++;
		last_json = JSON.stringify(grid);

		let newGrid = grid.map(row => row.slice()); // clone grid
		for (let r = 0; r < grid.length; r++) {
			for (let c = 0; c < grid[r].length; c++) {
				const ch = grid[r][c];
				if (ch == 'L' && count_adjacent2(grid, r, c) == 0) {
					newGrid[r][c] = "#";
				} else if (ch == '#' && count_adjacent2(grid, r, c) >= 5) {
					newGrid[r][c] = 'L';
				}
			}
		}
		grid = newGrid;
	} while (JSON.stringify(grid) != last_json);

	console.log(`Stabilized after ${steps} steps.  Seats = ${count_seats(grid)}`);
}

export async function run() {
	let inputs = (await getPuzzleInput()).map(i => i.split(''));
	part1(inputs.map(row => row.slice()));
	part2(inputs.map(row => row.slice()));
}

run();
