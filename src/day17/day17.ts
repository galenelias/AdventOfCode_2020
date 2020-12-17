import { getPuzzleInput } from '../util/input.js'

interface Coord {
	w: number;
	z: number;
	y: number;
	x: number;
}

function count_neighbors(grid: Set<string>, coord: Coord): number {
	let count = 0;
	for (let dw = -1; dw <= 1; dw++) {
		for (let dz = -1; dz <= 1; dz++) {
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					if (dx !== 0 || dy !== 0 || dz !== 0 || dw !== 0) {
						if (grid.has(JSON.stringify({w: coord.w + dw, z: coord.z + dz, y: coord.y + dy, x: coord.x + dx}))) {
							count++;
						}
					}
				}
			}
		}
	}
	return count;
}

async function run() {
	const inputs = await getPuzzleInput();

	let grid = new Set<string>();

	for (let y = 0; y < inputs.length; y++) { 
		for (let x = 0; x < inputs[y].length; x++) { 
			if (inputs[y][x] === '#') {
				grid.add(JSON.stringify({w: 0, z: 0, y, x}));
			}
		}
	}

	for (let cycle = 0; cycle < 6; cycle++) {
		let new_grid = new Set<string>(grid);
		let min_x = Number.MAX_SAFE_INTEGER;
		let min_y = Number.MAX_SAFE_INTEGER;
		let min_z = Number.MAX_SAFE_INTEGER;
		let min_w = Number.MAX_SAFE_INTEGER;
		let max_x = Number.MIN_SAFE_INTEGER;
		let max_y = Number.MIN_SAFE_INTEGER;
		let max_z = Number.MIN_SAFE_INTEGER;
		let max_w = Number.MIN_SAFE_INTEGER;
		for (const coord_s of grid) {
			const coord: Coord = JSON.parse(coord_s);
			min_x = Math.min(min_x, coord.x);
			min_y = Math.min(min_y, coord.y);
			min_z = Math.min(min_z, coord.z);
			min_w = Math.min(min_w, coord.w);
			max_x = Math.max(max_x, coord.x);
			max_y = Math.max(max_y, coord.y);
			max_z = Math.max(max_z, coord.z);
			max_w = Math.max(max_w, coord.w);
		}

		for (let w = min_w - 1; w <= max_w + 1; w++) {
			for (let z = min_z - 1; z <= max_z + 1; z++) {
				for (let y = min_y - 1; y <= max_y + 1; y++) {
					for (let x = min_x - 1; x <= max_x + 1; x++) {
						const coord: Coord = {w, z, y, x};
						const is_active = grid.has(JSON.stringify(coord));
						const neighbors = count_neighbors(grid, coord);
						if (is_active && neighbors !== 2 && neighbors !== 3) {
							new_grid.delete(JSON.stringify(coord));
						} else if (!is_active && neighbors === 3) {
							new_grid.add(JSON.stringify(coord));
						}
					}
				}
			}
		}
		grid = new_grid;
	}

	console.log("Part 2:", grid.size);
}

run();
