import { getPuzzleInput } from '../util/input.js'

interface Node {
	num: number,
	bag: string,
}

function fill_bag(start: string, start_num: number, map: Map<string, Node[]>): Node[] {
	let result: Node[] = [];

	const sub_bags = map.get(start)!;
	for (const bag of sub_bags) {
		const sub_num = start_num * bag.num;
		result.push({num: sub_num, bag: bag.bag});
		let sub_result = fill_bag(bag.bag, sub_num, map);
		result.push(...sub_result);
	}

	return result;
}

export async function run() {
	const inputs = await getPuzzleInput();
	const bag_regex = /(\w+ \w+) bags contain (.*)\.$/;
	const sub_bag_regex = /(\d+) (\w+ \w+) bags?$/;

	let rules = new Map<string, Node[]>();
	for (const line of inputs) {
		const matches = line.match(bag_regex)!;

		let sub_bags: Node[] = [];
		if (matches[2] != "no other bags") {
			let parts = matches[2].split(", ");
			for (const part of parts) {
				const sub_matches = part.match(sub_bag_regex)!;
				let num = +sub_matches[1];
				sub_bags.push({num, bag: sub_matches[2]});
			}
		}
		rules.set(matches[1], sub_bags);
	}

	let part1 = 0;
	for (const entry of rules) {
		let sub_bags = fill_bag(entry[0], 1, rules);
		if (sub_bags.find((s) => s.bag == "shiny gold")) {
			part1++;
		}
	}
	console.log("Part 1: ", part1);

	const part2_bags = fill_bag("shiny gold", 1, rules);
	console.log("Part 2: " , part2_bags.map((n) => n.num).reduce((acc, v) => acc + v));
}

run();
