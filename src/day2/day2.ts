import { getPuzzleInput } from '../util/input.js'

export async function run() {
	let inputStr = await getPuzzleInput();

	const pwd_regex = /(\d+)-(\d+) (\w): (\w+)/;
	let valid_passwords_1 = 0;
	let valid_passwords_2 = 0;
	for (var line of inputStr) {
		const matches = line.match(pwd_regex)!;
		const [range1, range2, pwd_letter, password] = matches.slice(1);

		const pwd_letter_count = [...password].filter((ch) => ch == pwd_letter).length;
		if (pwd_letter_count >= +range1 && pwd_letter_count <= +range2) {
			valid_passwords_1++;
		}

		if ((password[+range1 - 1] == pwd_letter) !== (password[+range2 - 1] == pwd_letter)) {
			valid_passwords_2++;
		}
	}

	console.log("Part 1: ", valid_passwords_1);
	console.log("Part 2: ", valid_passwords_2);
}

run();
