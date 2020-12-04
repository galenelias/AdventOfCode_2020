import { getPuzzleInput } from '../util/input.js'


export async function run() {
	const inputs = await getPuzzleInput();

	let fields: string[] = [];
	let valid_part1 = 0;
	let valid_part2 = 0;
	for (let i = 0; i < inputs.length; ++i) {
		if (inputs[i].length == 0) {
			let map = new Map<string, string>();
			for (let f of fields) {
				const p = f.split(":");
				map.set(p[0], p[1]);
			}
			if (map.size == 8 || (map.size == 7 && !map.has("cid"))) {
				valid_part1++;

				const byr = map.get("byr")!;
				const iyr = map.get("iyr")!;
				const eyr = map.get("eyr")!;
				const hgt = map.get("hgt")!;

				const v_byr = +byr >= 1920 && +byr <= 2002;
				const v_iyr = +iyr >= 2010 && +iyr <= 2020;
				const v_eyr = +eyr >= 2020 && +eyr <= 2030;
				const height = hgt.slice(0, -2);
				const v_hgt = ((hgt.endsWith("cm") && +height >= 150 && +height <= 193) ||
					 (hgt.endsWith("in") && +height >= 59 && +height <= 76));
				const v_hcl = map.get("hcl")!.match(/^#[0-9a-f]{6}$/);
				const v_ecl = map.get("ecl")!.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
				const v_pid = map.get("pid")!.match(/^[0-9]{9}$/);

				if (v_byr && v_iyr && v_eyr && v_hgt && v_hcl && v_ecl && v_pid) {
					valid_part2++;
				}
			}

			fields = [];
		} else {
			fields.push(...inputs[i].split(" "));
		}
	}
	console.log("Part 1:", valid_part1);
	console.log("Part 2:", valid_part2);
}

run();
