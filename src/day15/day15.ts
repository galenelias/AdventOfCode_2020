import { getPuzzleInput } from '../util/input.js'

async function run() {
	const inputs = await getPuzzleInput();
	const nums = inputs[0].split(',').map((v) => +v);

	let spoke = new Map<number, number>();

	for (let i = 0; i < nums.length-1; i++) {
		spoke.set(nums[i], i + 1);
	}

	let next = nums.slice(-1)[0];
	for (let turn = nums.length; turn != 30000000; ++turn) {
		if (turn === 2020 ) {
			console.log("Part 1", next);
		}

		let last_spoke = spoke.get(next);
		spoke.set(next, turn);
		if (last_spoke === undefined) {
			next = 0;
		} else {
			next = turn - last_spoke;
		}
	}
	console.log("Part 2", next);
}

run();
