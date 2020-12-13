import { getPuzzleInput } from '../util/input.js'

export async function run() {
	const inputs = await getPuzzleInput();

	const leave = +inputs[0];
	const buses = inputs[1].split(',').map((v, i) => [+v, i]).filter(([v, i]) => !isNaN(v));

	// Part 1
	let min_bus: number | undefined = undefined;
	let min_wait_time = leave;
	for (const [bus_id, bus_offset] of buses) {
		const wait = bus_id - (leave % bus_id);
		if (wait < min_wait_time) {
			min_wait_time = wait;
			min_bus = bus_id;
		}
	}
	console.log("Part 1:", min_bus! * min_wait_time);

	// Part 2
	let val = 0;
	let increment = 1;
	for (const [bus_id, bus_offset] of buses) {
		while (((val + bus_offset) % bus_id) !== 0) {
			val += increment;
		}
		increment = increment * bus_id; // Assumes each bus_id is prime. Otherwise use LCM()
	}
	console.log!("Part 2:", val);
}

run();
