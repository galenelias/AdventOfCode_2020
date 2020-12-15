import { getPuzzleInput } from '../util/input.js'

async function run() {
	const inputs = await getPuzzleInput();

	const nums = inputs[0].split(',').map((v) => +v);

	let turn = 1;
	let spoke = new Map<number, number>();

	for (let i = 0; i < nums.length-1; i++) {
		spoke.set(nums[i], turn);
		turn++;
	}

	let next = nums.slice(-1)[0];
	while (true) {
		if (turn === 2020 ) {
			console.log("Part 1", next);
		} else if (turn === 30000000 ) {
			console.log("Part 2", next);
			break;
		}

		let last_spoke = spoke.get(next);
		spoke.set(next, turn);
		if (last_spoke === undefined) {
			next = 0;
		} else {
			next = turn - last_spoke;
		}

		turn++;
	}
}

run();
