import { getPuzzleInput } from '../util/input.js'

// Use cube coordinates (https://www.redblobgames.com/grids/hexagons/#coordinates-cube)
interface Coord {
	x: number;
	y: number;
	z: number;
}

function count_neighbors(grid: Set<string>, coord: Coord): number {
	let count = 0;
	for (const [dx, dy, dz] of [[-1,0,1], [0,-1,1], [1,-1,0], [1,0,-1], [0,1,-1], [-1,1,0]]) {
		if (grid.has(JSON.stringify({x: coord.x + dx, y: coord.y + dy, z: coord.z + dz}))) {
			count++;
		}
	}
	return count;
}

async function run() {
	const inputs = await getPuzzleInput();

	let grid = new Set<string>();
	
	for (const line of inputs) {
		let x = 0;
		let y = 0;
		let z = 0;

		for (let i = 0; i < line.length; ) {
			if (line[i] === 'e') { x++; y--; i++; }
			else if (line[i] === 'w') { y++; x--; i++; }
			else if (line.slice(i,i+2) === 'ne') { x++; z--; i += 2; }
			else if (line.slice(i,i+2) === 'nw') { y++; z--; i += 2; }
			else if (line.slice(i,i+2) === 'se') { z++; y--; i += 2; }
			else if (line.slice(i,i+2) === 'sw') { z++; x--; i += 2; }
			else { throw new Error(`Unexpected at character ${i} of line ${line}`); }
		}

		let coord_json = JSON.stringify({x, y, z});
		if (grid.has(coord_json)) {
			grid.delete(coord_json);
		} else {
			grid.add(coord_json);
		}
	}

	console.log("Part 1:", grid.size);

	for (let steps = 0; steps < 100; steps++) {
		let new_grid = new Set<string>(grid);
		let all_coords = Array.from(grid).map(v => JSON.parse(v) as Coord);

		let mins = all_coords.reduce((a, b) => { return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), z: Math.min(a.z, b.z)}});
		let maxs = all_coords.reduce((a, b) => { return { x: Math.max(a.x, b.x), y: Math.max(a.y, b.y), z: Math.max(a.z, b.z)}});

		for (let z = mins.z - 1; z <= maxs.z + 1; z++) {
			for (let y = mins.y - 1; y <= maxs.y + 1; y++) {
				for (let x = mins.x - 1; x <= maxs.x + 1; x++) {
					if (z + x + y !== 0) {
						continue; // Skip invalid cube coordinates
					}
					const coord: Coord = {x, y, z};
					const is_active = grid.has(JSON.stringify(coord));
					const neighbors = count_neighbors(grid, coord);
					if (is_active && (neighbors === 0 || neighbors > 2)) {
						new_grid.delete(JSON.stringify(coord));
					} else if (!is_active && neighbors === 2) {
						new_grid.add(JSON.stringify(coord));
					}
				}
			}
		}
		grid = new_grid;
	}
	console.log("Part 2:", grid.size);
}

run();
