import { getPuzzleInput } from '../util/input.js'

let memo = new Map<number, number>();

function subsolve(inputs: number[], start: number): number {
	if (start == inputs.length - 1) {
		return 1;
	}

	let m = memo.get(start);
	if (m) {
		return m;
	}

	let sum = 0;
	for (let i = 1; i <= 3; i++) {
		if (inputs[start + i] - inputs[start] <= 3) {
			sum = sum + subsolve(inputs, start + i);
		}
	}

	memo.set(start, sum);
	return sum;
}

export async function run() {
	let inputs = (await getPuzzleInput()).map(i => +i);

	inputs.push(0); // outlet
	inputs.sort((a, b) => a - b);
	inputs.push(inputs[inputs.length-1] + 3); // device

	let jolts = [0, 0, 0, 0];
	for (let i = 0; i < inputs.length - 1; i++) {
		jolts[inputs[i+1] - inputs[i]]++;
	}
	console.log("Part 1: ", jolts[1] * jolts[3]);
	console.log("Part 2: ", subsolve(inputs, 0));
}

run();
