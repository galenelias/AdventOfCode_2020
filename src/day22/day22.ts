import { getPuzzleInput } from '../util/input.js'


function score_deck(deck: number[]) {
	return deck.map((v, i) => v * (deck.length - i)).reduce((acc, v) => acc + v);
}

function part1(p1deck: number[], p2deck: number[]) {
	let round = 0;
	while (p1deck.length > 0 && p2deck.length > 0) {
		round++;
		const p1card = p1deck[0];
		const p2card = p2deck[0];

		p1deck = p1deck.slice(1);
		p2deck = p2deck.slice(1);
		if (p1card > p2card) {
			p1deck.push(p1card, p2card);
		} else if (p2card > p1card) {
			p2deck.push(p2card, p1card);
		}
	}

	if (p1deck.length > 0) {
		console.log("Part 1:", score_deck(p1deck));
	} else {
		console.log("Part 1:", score_deck(p2deck));
	}
}


function recursive_combat(game: number, p1deck: number[], p2deck: number[]): number {
	let p1seen = new Set<string>();
	let p2seen = new Set<string>();
	let round = 0;

	while (p1deck.length > 0 && p2deck.length > 0) {
		round++;
		let p1deck_json = JSON.stringify(p1deck);
		let p2deck_json = JSON.stringify(p2deck);
		if (p1seen.has(p1deck_json) || p2seen.has(p2deck_json)) {
			return 1;
		}

		p1seen.add(p1deck_json);
		p2seen.add(p2deck_json);

		const p1card = p1deck[0];
		const p2card = p2deck[0];
		p1deck = p1deck.slice(1);
		p2deck = p2deck.slice(1);

		let winner = 0;
		if (p1card > (p1deck.length) || p2card > (p2deck.length)) {
			// Not enough cards left
			winner = (p1card > p2card) ? 1 : 2;
		} else {
			winner = recursive_combat(game + 1, p1deck.slice(0, p1card), p2deck.slice(0, p2card));
		}

		if (winner == 1) {
			p1deck.push(p1card, p2card);
		} else {
			p2deck.push(p2card, p1card);
		}
	}

	if (game === 1) {
		if (p1deck.length > 0) {
			console.log("Part 2:", score_deck(p1deck));
		} else {
			console.log("Part 2:", score_deck(p2deck));
		}
	}

	return (p2deck.length == 0) ? 1 : 2;
}

async function run() {
	const inputs = await getPuzzleInput();

	let p1deck: number[] = [];
	let p2deck: number[] = [];

	{
		let i = 0;
		i++;
		for (;inputs[i].length > 0; i++) {
			p1deck.push(+inputs[i]);
		}

		i += 2;
		for (;i < inputs.length && inputs[i].length > 0; i++) {
			p2deck.push(+inputs[i]);
		}
	}

	part1(p1deck.slice(0), p2deck.slice(0));
	recursive_combat(1, p1deck, p2deck);
}

run();
