import { getPuzzleInput } from '../util/input.js'

interface RunResult {
	hung: boolean,
	acc: number,
}

function simulate(program: string[]): RunResult {
	let pc = 0;
	let acc = 0;
	let seen: boolean[] = new Array(program.length).fill(false);

	while (pc < program.length) {
		if (seen[pc]) {
			return { hung: true, acc };
		}
		seen[pc] = true;
		const parts = program[pc].split(' ');
		if (parts[0] == "nop") {
			// no-op
		} else if (parts[0] == 'acc') {
			acc += +parts[1];
		} else if (parts[0] == 'jmp') {
			pc += +parts[1] - 1;
		}
		pc++;
	}

	return { hung: false, acc };
}

export async function run() {
	let inputs = await getPuzzleInput();

	console.log("Part 1: ", simulate(inputs).acc);

	for (let i = 0; i < inputs.length; i++) {
		const parts = inputs[i].split(' ');
		
		if (parts[0] == "jmp" || parts[0] == "nop") {
			const original_line = inputs[i];
			if (parts[0] == "jmp") {
				inputs[i] = "nop " + parts[1];
			} else if (parts[0] == "nop") {
				inputs[i] = "jmp " + parts[1];
			}
			let result = simulate(inputs);

			if (result.hung === false) {
				console.log("Part 2: ", result.acc);
				break;
			}

			inputs[i] = original_line;
		}
	}
}

run();
