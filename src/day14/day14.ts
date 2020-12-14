import { getPuzzleInput } from '../util/input.js'

export async function run() {
	const inputs = await getPuzzleInput();

	let mask = "X";
	let memory = new Map<number, bigint>();

	for (const line of inputs) {
		if (line.startsWith("mask = ")) {
			mask = line.split(" = ")[1];
		} else {
			let parts = line.split(" = ");
			let val = BigInt(+parts[1]);
			let addr = +parts[0].slice(4, -1);

			// Adjust val for mask
			for (let i = 0; i < 36; i++) {
				let ch = mask[35-i];
				if (ch === '1') {
					val |= (1n << BigInt(i));
				} else if (ch == '0') {
					val &= ~(1n << BigInt(i));
				}
			}

			memory.set(addr, val);
		}
	}

	let sum = 0n;
	for (let x of memory.values()) {
		sum += x;
	}
	console.log("Part 1:", sum);
}

run();
