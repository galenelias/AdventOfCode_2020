use std::collections::HashMap;
use regex::Regex;

struct Node {
	bag_name: String,
	quantity: usize,
}

fn fill_bag(start: &String, ratio: usize, rules: &HashMap<String, Vec<Node>>) -> Vec<Node> {
	let mut result = Vec::new();

	for bag_node in rules.get(start).unwrap() {
		let bag_amount = bag_node.quantity * ratio;
		result.push(Node{ bag_name: bag_node.bag_name.clone(), quantity: bag_amount });
		result.append(&mut fill_bag(&bag_node.bag_name, bag_amount, rules));
	}

	result
}

pub fn solve(inputs: Vec<String>) {
	let re_line = Regex::new(r"(\w+ \w+) bags contain (.*)\.$").unwrap();
	let re_bag = Regex::new(r"(\d+) (\w+ \w+) bags?$").unwrap();

	let mut rules: HashMap<String, Vec<Node>> = HashMap::new();

	for line in inputs {
		let caps = re_line.captures(&line).unwrap();
		let mut sub_bags = Vec::<Node>::new();

		if &caps[2] != "no other bags" {
			for part in caps[2].split(", ") {
				let sub_caps = re_bag.captures(part).unwrap();
				sub_bags.push(Node{ bag_name: sub_caps[2].to_string(), quantity: sub_caps[1].parse::<usize>().unwrap()});
			}
		}

		rules.insert(caps[1].to_string(), sub_bags);
	}

	let part1: usize = rules.keys().map(|key| {
		fill_bag(key, 1, &rules).iter().find(|n| n.bag_name == "shiny gold").map_or(0, |_| 1)
	}).sum();
	println!("Part 1: {}", part1);

	let part2_bags = fill_bag(&String::from("shiny gold"), 1, &rules);
	println!("Part 2: {}", part2_bags.iter().map(|n| n.quantity).sum::<usize>());
}
