import { getPuzzleInput } from '../util/input.js'

function get_loop_size(public_key: number) {
	const subject_number = 7;
	let value = 1;
	let loop_size = 0;
	while (value !== public_key) {
		value *= subject_number;
		value %= 20201227;
		loop_size++;
	}
	return loop_size;
}

function get_encryption_key(loop_count: number, public_key: number) {
	let value = 1;
	for (let i = 0; i < loop_count; i++) {
		value *= public_key;
		value %= 20201227;
	}
	return value;
}

async function run() {
	const inputs = await getPuzzleInput();

	let card_public_key = +inputs[0];
	let door_public_key = +inputs[1];

	let card_loop_count = get_loop_size(card_public_key);
	let door_loop_count = get_loop_size(door_public_key);

	let encryption_key = get_encryption_key(card_loop_count, door_public_key);
	if (encryption_key !== get_encryption_key(door_loop_count, card_public_key)) {
		throw new Error("Mismatched encryption key");
	}
	console.log("Part 1:", encryption_key);
}

run();
