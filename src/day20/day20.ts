import { getPuzzleInput } from '../util/input.js'

class Tile {
	id: number;
	data: string[];

	constructor(id: number, data: string[]) {
		this.id = id;
		this.data = data;
	}

	getTopEdge(): string {
		return this.data[0];
	}

	getBottomEdge(): string {
		return this.data.slice(-1)[0];
	}

	getLeftEdge(): string {
		return this.data.map(line => line[0]).join("");
	}

	getRightEdge(): string {
		return this.data.map(line => line.slice(-1)[0]).join("");
	}

	getEdges(): string[] {
		return [this.getTopEdge(), this.getBottomEdge(), this.getLeftEdge(), this.getRightEdge()];
	}

	rotateCCW() {
		this.data = rotateGridCCW(this.data);
	}

	flipVertically() {
		this.data = flipGridVertically(this.data);
	}

	flipHorizontally() {
		this.data = flipGridHorizontally(this.data);
	}
}

function rotateGridCCW(data: string[]): string[] {
	let result: string[] = [];
	for (let col = data.length - 1; col >= 0; col--) {
		result.push(data.map(line => line[col]).join(""));
	}
	return result;
}

function flipGridVertically(data: string[]): string[] {
	return data.reverse();
}

function flipGridHorizontally(data: string[]): string[] {
	return data.map(row => reverseString(row));
}

function addEdgeToMap(edges_map: Map<string, number[]>, edge: string, tile_id: number) {
	let list = edges_map.get(edge);
	if (list === undefined) {
		edges_map.set(edge, []);
		list = edges_map.get(edge)!;
	}
	list.push(tile_id);
}

function reverseString(str: string): string {
	return str.split("").reverse().join("");
}

function fuzzy_match(str1: string, str2: string): boolean {
	return str1 === str2 || str1 === reverseString(str2);
}

function isTopLeftCorner(tile: Tile, edges_map: Map<string, number[]>): boolean {
	return edges_map.get(tile.getTopEdge())!.length === 1
			&& edges_map.get(tile.getLeftEdge())!.length === 1;
}

function getTileOnRight(tile: Tile, edges_map: Map<string, number[]>, tile_map: Map<number, Tile>): Tile {
	let right_edge = tile.getRightEdge();
	let edge_pair = edges_map.get(right_edge)!;
	let neighbor_id = tile.id == edge_pair[0] ? edge_pair[1] : edge_pair[0];
	let neighbor_tile = tile_map.get(neighbor_id)!;
	// rotate into position
	while (!fuzzy_match(right_edge, neighbor_tile.getLeftEdge())) {
		neighbor_tile.rotateCCW();
	}
	if (right_edge !== neighbor_tile.getLeftEdge()) {
		neighbor_tile.flipVertically();
	}
	return neighbor_tile;
}

function getTileOnBottom(tile: Tile, edges_map: Map<string, number[]>, tile_map: Map<number, Tile>): Tile {
	let bottom_edge = tile.getBottomEdge();
	let edge_pair = edges_map.get(bottom_edge)!;
	let neighbor_id = tile.id == edge_pair[0] ? edge_pair[1] : edge_pair[0];
	let neighbor_tile = tile_map.get(neighbor_id)!;
	// rotate into position
	while (!fuzzy_match(bottom_edge, neighbor_tile.getTopEdge())) {
		neighbor_tile.rotateCCW();
	}
	if (bottom_edge !== neighbor_tile.getTopEdge()) {
		neighbor_tile.flipHorizontally();
	}
	return neighbor_tile;
}

const c_seaMonster: string[] = [
	"                  # ",
	"#    ##    ##    ###",
	" #  #  #  #  #  #   ",
];

function countSeaMonsters(grid: string[]): number {
	let count = 0;
	for (let row = 0; row < grid.length - c_seaMonster.length; row++) {
		for (let col = 0; col < grid[row].length - c_seaMonster[0].length; col++) {
			let allMatch = true;
			for (let sr = 0; allMatch && sr < c_seaMonster.length; sr++) {
				for (let sc = 0; sc < c_seaMonster[sr].length; sc++) {
					if (c_seaMonster[sr][sc] === '#' && grid[row + sr][col + sc] !== '#') {
						allMatch = false;
						break;
					}
				}
			}
			if (allMatch) {
				count++;
			}
		}
	}
	
	return count;
}

function countChars(grid: string[], char: string): number {
	return grid.map(str => str.split("").filter(ch => ch === char).length)
			.reduce((acc, v) => acc + v);
}

async function run() {
	const inputs = await getPuzzleInput();

	let i = 0;
	let tiles: Tile[] = [];

	for (; i < inputs.length; i++) {
		let line = inputs[i];

		if (line.startsWith("Tile ")) {
			let grid: string[] = [];
			let tile_id = +line.slice(5, -1);
			i++;

			for (; i < inputs.length && inputs[i].length > 0; i++) {
				grid.push(inputs[i]);
			}

			tiles.push(new Tile(tile_id, grid));
		}
	}

	// Build a map of every edge string variant to the tile id with that edge
	let edges_map = new Map<string, number[]>();
	for (const tile of tiles) {
		let edges = tile.getEdges();
		for (let edge of edges) {
			addEdgeToMap(edges_map, edge, tile.id);
			addEdgeToMap(edges_map, reverseString(edge), tile.id);
		}
	}

	let part1 = 1;
	let any_corner: Tile | undefined = undefined;
	for (const tile of tiles) {
		let neighbor_count = tile.getEdges().filter(e => edges_map.get(e)!.length == 2).length;

		// Corners are the only tiles with only two neighbors
		if (neighbor_count === 2) {
			part1 *= tile.id;
			any_corner = tile;
		}
	}

	console.log("Part 1:", part1);

	let tile_map = new Map<number, Tile>();
	for (const tile of tiles) {
		tile_map.set(tile.id, tile);
	}

	// Assemble full grid starting from arbitrarily chosen top left corner
	let top_left = any_corner!;
	while (!isTopLeftCorner(top_left, edges_map)) {
		top_left.rotateCCW();
	}

	let tile_dim = top_left.data.length;
	let grid_dim = Math.sqrt(tiles.length);
	let row_anchor = top_left;

	let full_map: string[] = [];
	for (let i = 0; i < grid_dim; i++) {
		// Assemble each the image one 'row' at a time
		let full_map_chunk: string[] = [];

		for (let x = 0; x < tile_dim - 2; x++) {
			full_map_chunk.push("");
		}

		let row_cursor = row_anchor;
		for (let j = 0; j < grid_dim; j++) {
			for (let row = 1; row < tile_dim - 1; row++) {
				full_map_chunk[row-1] += row_cursor.data[row].slice(1, -1);
			}

			if (j !== grid_dim - 1) {
				row_cursor = getTileOnRight(row_cursor, edges_map, tile_map);
			}
		}

		// Add the data from the row to the full map and advance to the next row if we're not done
		full_map.push(...full_map_chunk);
		if (i !== grid_dim - 1) {
			row_anchor = getTileOnBottom(row_anchor, edges_map, tile_map);
		}
	}

	let hashes_count = countChars(full_map, '#');

	// Try all for rotations
	for (let i = 0; i < 4; i++) {
		// And each vertical 'flip' orientation
		for (let j = 0; j < 2; j++) {
			let monsters = countSeaMonsters(full_map);
			if (monsters > 0) {
				// Assume no overlapping sea monsters
				console.log("Part 2:", hashes_count - countChars(c_seaMonster, '#') * monsters);
			}
			full_map = flipGridVertically(full_map);
		}
		full_map = rotateGridCCW(full_map);
	}
}

run();
