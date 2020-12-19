import { getPuzzleInput } from '../util/input.js'

enum RuleType {
	Char,
	SubRule,
}

interface Rule {
	type: RuleType;
	char?: string;
	subRules?: number[][];
}

type RuleMap = Map<number, Rule>;

// Given a rule, start matching string at offset 'i'.
// Returns: Array of all possible ending positions after matching the rule (or empty if no matches were found)
function match(rules: RuleMap, rule: Rule, str: string, i: number): number[] {
	if (i >= str.length) {
		return [];
	}

	if (rule.type === RuleType.Char) {
		if (str[i] === rule.char!) {
			return [i + 1];
		} else {
			return [];
		}
	} else {
		let results: number[] = [];
		for (const seq of rule.subRules!) {
			let current_offsets = [i];
			for (const subRule of seq) {
				let next_offsets = [];
				for (const offset of current_offsets) {
					const result = match(rules, rules.get(subRule)!, str, offset);
					next_offsets.push(...result);
				}
				current_offsets = next_offsets;
			}
			results.push(...current_offsets);
		}
		return results;
	}
}

function subSolve(inputs: string[], part2rules: boolean): number {
	let rules = new Map<number, Rule>();

	let i = 0;
	for (; i < inputs.length; i++) {
		let input = inputs[i];
		if (input.length === 0) {
			break;
		}

		if (part2rules) {
			if (input.startsWith("8: ")) {
				input = "8: 42 | 42 8";
			} else if (input.startsWith("11: ")) {
				input = "11: 42 31 | 42 11 31";
			}
		}

		const parts = input.split(": ");
		const rule_num = +parts[0];
		if (parts[1][0] === '"') {
			rules.set(rule_num, {type: RuleType.Char, char: parts[1][1]});
		} else {
			const subRules = parts[1].split(" | ").map(seq => seq.split(" ").map(v => +v));
			rules.set(rule_num, {type: RuleType.SubRule, subRules});
		}
	}

	let matchingRules = 0;
	for (const input of inputs.slice(i+1)) {
		const results = match(rules, rules.get(0)!, input, 0);

		// We succesfully matched if any of our matches consumed the entire input string
		if (results.some(offset => offset === input.length)) {
			matchingRules++;
		}
	}
	return matchingRules;
}

async function run() {
	const inputs = await getPuzzleInput();

	console.log("Part 1", subSolve(inputs, false /*part2rules*/));
	console.log("Part 2", subSolve(inputs, true /*part2rules*/));
}

run();
