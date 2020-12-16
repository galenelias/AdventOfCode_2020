import { getPuzzleInput } from '../util/input.js'

interface Rule {
	name: string;
	ranges: number[][];
}

// Check a rule against a specific field in all tickets, returning true if that rule is satisfied for every ticket
function is_valid_rule(tickets: number[][], rule: Rule, field_num: number): boolean {
	for (const ticket of tickets) {
		const val = ticket[field_num];
		if (!rule.ranges.some(range => val >= range[0] && val <= range[1])) {
			return false;
		}
	}
	return true;
}

// Compute the matrix of [rule][field] validity
function compute_validities(rules: Rule[], tickets: number[][]): boolean[][] {
	let validities: boolean[][] = []
	for (const rule of rules) {
		let valid_fields: boolean[] = [];
		for (let i = 0; i < rules.length; i++) {
			valid_fields.push(is_valid_rule(tickets, rule, i));
		}
		validities.push(valid_fields);
	}
	return validities;
}

async function run() {
	const inputs = await getPuzzleInput();

	let i = 0;
	// Process rules
	let rules: Rule[] = [];
	for (; inputs[i].length > 0; i++) {
		const parts = inputs[i].split(": ");
		const ranges = parts[1].split(" or ");
		rules.push({name: parts[0], ranges: ranges.map(v => v.split("-").map(v => +v))});
	}

	// Your ticket
	i += 2;
	const your_ticket = inputs[i].split(',').map(v => +v);

	i += 3; // nearby tickets
	let part1 = 0;
	let valid_tickets: number[][] = [your_ticket];
	for (;i < inputs.length; i++) {
		let vals = inputs[i].split(',').map(v => +v);

		let valid_vals = 0;
		for (let val of vals) {
			let valid = rules.some(rule => rule.ranges.some(range => val >= range[0] && val <= range[1]));
			if (valid) {
				valid_vals++;
			} else {
				part1 += val;
			}
		}
		if (valid_vals === vals.length) {
			valid_tickets.push(vals);
		}
	}

	console.log("Part 1:", part1);
	
	let validities = compute_validities(rules, valid_tickets);
	let assignments = new Array(rules.length).fill(NaN);

	for (let i = 0; i < rules.length; ++i) {
		let constrained_rule = validities.findIndex(row => 1 == row.reduce((acc, v) => acc + (v ? 1 : 0), 0));
		if (constrained_rule < 0) {
			throw "Can't find fully constrained row!";
		}

		let matched_field_num = validities[constrained_rule].findIndex(v => v);
		assignments[constrained_rule] = matched_field_num;
		for (let row of validities) {
			row[matched_field_num] = false;
		}
	}

	let part2 = 1;
	for (let i = 0; i < rules.length; i++) {
		if (rules[i].name.startsWith("departure")) {
			part2 *= your_ticket[assignments[i]];
		}
	}
	console.log("Part 2:", part2);
}

run();
