import { getPuzzleInput } from '../util/input.js'

interface Coord {
	w: number;
	z: number;
	y: number;
	x: number;
}

function count_neighbors(grid: Set<string>, coord: Coord, part: number): number {
	let count = 0;
	for (let dw = -1; dw <= 1; dw++) {
		if (part == 1 && dw !== 0)
			continue;

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

	for (let part = 1; part <= 2; part++) {
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
			let all_coords = Array.from(grid).map(v => JSON.parse(v) as Coord);
			let mins = all_coords.reduce((a, b) => { return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), z: Math.min(a.z, b.z), w: Math.min(a.w, b.w)}});
			let maxs = all_coords.reduce((a, b) => { return { x: Math.max(a.x, b.x), y: Math.max(a.y, b.y), z: Math.max(a.z, b.z), w: Math.max(a.w, b.w)}});
	
			for (let w = mins.w - 1; w <= maxs.w + 1; w++) {
				for (let z = mins.z - 1; z <= maxs.z + 1; z++) {
					for (let y = mins.y - 1; y <= maxs.y + 1; y++) {
						for (let x = mins.x - 1; x <= maxs.x + 1; x++) {
							const coord: Coord = {w, z, y, x};
							const is_active = grid.has(JSON.stringify(coord));
							const neighbors = count_neighbors(grid, coord, part);
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
		console.log(`Part ${part}:`, grid.size);
	}
}

run();
