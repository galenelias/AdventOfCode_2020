import { getPuzzleInput } from '../util/input.js'

function countTrees(slope: string[], dc: number, dr: number): number {
	let r = 0;
	let c = 0;
	let trees = 0;
	const cols = slope[0].length;
	while (r < slope.length) {
		if (slope[r][c % cols] == '#') {
			trees++;
		}
		r += dr;
		c += dc;
	}
	return trees;
}

export async function run() {
	const inputStr = await getPuzzleInput();

	console.log("Part 1: ", countTrees(inputStr, 3, 1));

	let product = 1;
	for (let x of [[1, 1], [3, 1], [5,1], [7,1], [1,2]]) {
		product *= countTrees(inputStr, x[0], x[1]);
	}
	console.log("Part 2: ", product);
}

run();
