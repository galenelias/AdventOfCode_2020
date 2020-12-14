import { getPuzzleInput } from '../util/input.js'

function part1(inputs: string[]) {
	let mask = "";
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

	let sum = Array.from(memory.values()).reduce((acc, v) => acc + v);
	console.log("Part 1:", Number(sum));
}

function part2(inputs: string[]) {
	let mask = "";
	let memory = new Map<bigint, number>();

	for (const line of inputs) {
		if (line.startsWith("mask = ")) {
			mask = line.split(" = ")[1];
		} else {
			let parts = line.split(" = ");
			let val = +parts[1];
			let addr = BigInt(+parts[0].slice(4, -1));

			// Adjust addr for mask 1's
			for (let i = 0; i < 36; i++) {
				let ch = mask[35-i];
				if (ch === '1') {
					addr |= (1n << BigInt(i));
				}
			}

			// Catalogue X's, then walk through permutations
			let xs = [...mask].map((v, i) => [v, i]).filter(([v, i]) => v === 'X').map(([v, i]) => 35 - +i);
			for (let i = 0; i < Math.pow(2, xs.length); ++i) {
				xs.forEach((x_pos, idx) => {
					if ((i & (1 << idx)) != 0) {
						addr |= 1n << BigInt(x_pos);
					} else {
						addr &= ~(1n << BigInt(x_pos));
					}
				});
				memory.set(addr, val);
			}
		}
	}

	let sum = Array.from(memory.values()).reduce((acc, v) => acc + v);
	console.log("Part 2:", sum);
}

async function run() {
	const inputs = await getPuzzleInput();

	part1(inputs);
	part2(inputs);
}

run();
