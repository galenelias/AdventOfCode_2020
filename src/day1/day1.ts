
import { getPuzzleInput } from '../util/input.js'

function part1(input: number[]) {
	for (var i = 0; i < input.length; i++) {
		for (var j = i+1; j < input.length; j++) {
			if (input[i] + input[j] == 2020) {
				console.log("Part 1:", input[i] * input[j]);
			}
		}
	}
}

function part2(input: number[]) {
	for (var i = 0; i < input.length; i++) {
		for (var j = i+1; j < input.length; j++) {
			for (var k = j+1; k < input.length; k++) {
				if (input[i] + input[j] + input[k] == 2020) {
					console.log("Part 2:", input[i] * input[j] * input[k]);
				}
			}
		}
	}
}

function part1_funtional(input: number[]) {
	input.forEach((val1, idx1) => {
		input.slice(idx1+1).forEach((val2) => {
			if (val1 + val2 == 2020) {
				console.log("Part 1:", val1 * val2);
			}
		})

	});
}

function part2_functional(input: number[]) {
	input.forEach((val1, idx1) => {
		input.slice(idx1+1).forEach((val2, idx2) => {
			input.slice(idx2+1).forEach((val3) => {
				if (val1 + val2 + val3 == 2020) {
					console.log("Part 2:", val1 * val2 * val3);
				}
			});
		});
	});
}

export async function run() {
	let inputStr = await getPuzzleInput();
	let input = inputStr.map((val) => +val);

	part1(input);
	part1_funtional(input);
	part2(input);
	part2_functional(input);
}

run();
