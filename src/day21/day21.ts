import { getPuzzleInput } from '../util/input.js'

interface Food {
	ingredients: string[];
	allergens: string[];
}

async function run() {
	const inputs = await getPuzzleInput();

	let foods: Food[] = [];
	let allergen_map = new Map<string, Food[]>(); // English -> Food
	for (const input of inputs) {
		if (input.slice(-1)[0] !== ')') {
			throw new Error("Unexpected");
		}

		const parts = input.split(" (contains ");
		const ingredients = parts[0].split(" ");
		const allergens = parts[1].slice(0, -1).split(", ");

		let food = {ingredients, allergens};
		foods.push(food);

		for (const allergen of allergens) {
			allergen_map.set(allergen, allergen_map.get(allergen) ?? []); // Ensure key with empty array
			allergen_map.get(allergen)!.push(food);
		}
	}

	let allergen_identity = new Map<string, string>(); // English -> Local
	let allergen_ingredients= new Set<string>(); // Local

	while (allergen_identity.size < allergen_map.size) {
		for (const [allergen, foods] of allergen_map) {
			let ingredient_suspects = new Set<string>(foods[0].ingredients);

			// Intersect across all foods with this allergen
			for (const food of foods.slice(1)) {
				ingredient_suspects = new Set<string>(food.ingredients.filter(x => ingredient_suspects.has(x)));
			}

			// Remove already identified allergens
			ingredient_suspects = new Set<string>([...ingredient_suspects].filter(x => !allergen_ingredients.has(x)));

			// Find any allergen with only one possible ingredient mapping
			if (ingredient_suspects.size === 1) {
				let allergen_ingredient = [...ingredient_suspects][0];
				allergen_identity.set(allergen, allergen_ingredient);
				allergen_ingredients.add(allergen_ingredient);
			}
		}
	}

	const part1 = foods.map(f => f.ingredients.filter(i => !allergen_ingredients.has(i)).length)
			.reduce((acc, v) => acc + v);
	console.log("Part 1:", part1);

	let allergens = Array.from(allergen_identity.keys()).sort();
	console.log("Part 2:", allergens.map(a => allergen_identity.get(a)!).join(","));
}

run();
