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

			for (let j = 0; j < inputs.length; j++) {
				for (let k = j + 1; k < inputs.length; k++) {
					const jk_slice = inputs.slice(j, k);
					const sum = jk_slice.reduce((acc, v) => acc + v);
					if (sum > num) {
						break;
					} else if (sum == num) {
						console.log("Part 2:", Math.min(...jk_slice) + Math.max(...jk_slice));
						return;
					}
				}
			}
		}
	}
}

run();
