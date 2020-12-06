import { getPuzzleInput } from '../util/input.js'

function charOrd(s: string): number {
	return s.charCodeAt(0) - 'a'.charCodeAt(0);
}

export async function run() {
	const inputs = await getPuzzleInput();
	inputs.push(""); // Ensure sentinel line

	let part1 = 0;
	let part2 = 0;
	let group_size = 0;
	let letter_freqs: number[] = new Array(26).fill(0);

	for (const line of inputs) {
		if (line.length > 0) {
			group_size++;
			for (const ch of line) {
				letter_freqs[charOrd(ch)]++;
			}
		} else if (group_size > 0) {
			part1 += letter_freqs.filter((c) => c > 0).length;
			part2 += letter_freqs.filter((c) => c == group_size).length;

			group_size = 0;
			letter_freqs = new Array(26).fill(0);
		}
	}

	console.log("Part 1: ", part1);
	console.log("Part 2: ", part2);
}

run();
