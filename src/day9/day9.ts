import { getPuzzleInput } from '../util/input.js'

export async function run() {
	let inputs_str = await getPuzzleInput();
	const inputs: number[] = inputs_str.map(i => +i);

	const preamble_size = 25;

	for (let i = preamble_size; i < inputs.length; ++i) {
		const num = inputs[i];
		let found = false;
		for (let j = i - preamble_size; !found && j < i - 1; j++) {
			for (let k = j + 1; k < i; k++) {
				if (inputs[j] + inputs[k] == num && inputs[j] !== inputs[k]) {
					found = true;
				} 
			}
		}

		if (!found) {
			console.log("Part 1:", num);

			let j = 0;
			let k = 0;
			let sum = 0;

			while (sum !== num) {
				if (sum < num) {
					sum += inputs[k++];
				} else if (sum > num) {
					sum -= inputs[j++];
				}
			}
			const jk_slice = inputs.slice(j, k);
			console.log("Part 2:", Math.min(...jk_slice) + Math.max(...jk_slice));
			break;
		}
	}
}

run();
