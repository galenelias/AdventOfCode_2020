import { getPuzzleInput } from '../util/input.js'

function getDxDy(dir: string): [number, number] {
	switch (dir) {
		case "N": return [0, -1];
		case "E": return [1, 0];
		case "S": return [0, 1];
		case "W": return [-1, 0];
		default: throw "Unexpected";
	}
}

function turnRight(dir: string): string {
	switch (dir) {
		case "N": return "E";
		case "E": return "S";
		case "S": return "W";
		case "W": return "N";
		default: throw "Unexpected";
	}
}

function turnLeft(dir: string): string {
	switch (dir) {
		case "N": return "W";
		case "W": return "S";
		case "S": return "E";
		case "E": return "N";
		default: throw "Unexpected";
	}
}

function part1(inputs: string[]) {
	let dir = "E";
	let ship = [0, 0];

	for (let input of inputs) {
		const cmd = input[0];
		const num = +input.slice(1);
		let dxdy: [number, number] | undefined = undefined;

		if (cmd == "F") {
			dxdy = getDxDy(dir);
		} else if (cmd == "R") {
			for (let i = 0; i < num / 90; i++) {
				dir = turnRight(dir);
			}
		} else if (cmd == "L") {
			for (let i = 0; i < num / 90; i++) {
				dir = turnLeft(dir);
			}
		} else { // N, E, S, W
			dxdy = getDxDy(cmd);
		}

		if (dxdy !== undefined) {
			ship[0] += num * dxdy[0];
			ship[1] += num * dxdy[1];
		}
	}
	console.log("Part 1:", Math.abs(ship[0]) + Math.abs(ship[1]));
}

function part2(inputs: string[]) {
	let ship = [0, 0];
	let waypoint = [10, -1];

	for (let input of inputs) {
		const cmd = input[0];
		const num = +input.slice(1);

		if (cmd == "F") {
			ship[0] += num * waypoint[0];
			ship[1] += num * waypoint[1];
		} else if (cmd == "R") {
			for (let i = 0; i < num / 90; i++) {
				waypoint = [-waypoint[1], waypoint[0]];
			}
		} else if (cmd == "L") {
			for (let i = 0; i < num / 90; i++) {
				waypoint = [waypoint[1], -waypoint[0]];
			}
		} else {
			let dxdy = getDxDy(cmd);
			waypoint[0] += dxdy[0] * num;
			waypoint[1] += dxdy[1] * num;
		}
	}

	console.log("Part 2:", Math.abs(ship[0]) + Math.abs(ship[1]));
}

export async function run() {
	let inputs = await getPuzzleInput();
	part1(inputs);
	part2(inputs);
}

run();
