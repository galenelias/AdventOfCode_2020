use itertools::Itertools;
use std::collections::HashSet;
use std::cmp::{min, max};

#[derive(Copy, Clone, Debug, PartialEq, Eq, Hash)]
struct Coord {
	x: i32, y: i32, z: i32,
}

fn count_neighbors(grid: &HashSet<Coord>, pt: &Coord) -> usize {
	[[-1,0,1], [0,-1,1], [1,-1,0], [1,0,-1], [0,1,-1], [-1,1,0]].iter()
		.filter(|d| grid.contains(&Coord{x: pt.x + d[0], y: pt.y + d[1], z: pt.z + d[2]}))
		.count()
}

pub fn solve(inputs: Vec<String>) {

	let mut grid: HashSet<Coord> = HashSet::new();
	
	for line in inputs {
		let mut x = 0;
		let mut y = 0;
		let mut z = 0;

		let mut i = 0;
		while i < line.len() {
			let str_slice = &line[i..];
			if str_slice.starts_with('e') { x += 1; y -= 1; i += 1; }
			else if str_slice.starts_with('w') { y += 1; x -= 1; i += 1; }
			else if str_slice.starts_with("ne") { x += 1; z -= 1; i += 2; }
			else if str_slice.starts_with("nw") { y += 1; z -= 1; i += 2; }
			else if str_slice.starts_with("se") { z += 1; y -= 1; i += 2; }
			else if str_slice.starts_with("sw") { z += 1; x -= 1; i += 2; }
			else { panic!("Unexpected at character {} of line {}", i, line); }
		}

		let coord = Coord { x, y, z};
		if grid.contains(&coord) {
			grid.remove(&coord);
		} else {
			grid.insert(coord);
		}
	}

	println!("Part 1: {}", grid.len());

	for _steps in 0..100 {
		let mut new_grid = grid.clone();
		let min = grid.iter().cloned().fold1(|a, b| Coord {x: min(a.x, b.x), y: min(a.y, b.y), z: min(a.z, b.z)}).unwrap();
		let max = grid.iter().cloned().fold1(|a, b| Coord {x: max(a.x, b.x), y: max(a.y, b.y), z: max(a.z, b.z)}).unwrap();
		for z in (min.z - 1)..=(max.z + 1) {
			for y in (min.y - 1)..=(max.y + 1) {
				let x = 0 - y - z;
				// for x in (min.x - 1)..=(max.x + 1) {
				// 	if z + x + y != 0 {
				// 		continue; // Skip invalid cube coordinates
				// 	}
					let coord = Coord {z, y, x};
					let is_active = grid.contains(&coord);
					let neighbors = count_neighbors(&grid, &coord);
					if is_active && (neighbors == 0 || neighbors > 2) {
						new_grid.remove(&coord);
					} else if !is_active && neighbors == 2 {
						new_grid.insert(coord);
					}
				}
			// }
		}
		grid = new_grid;
	}

	println!("Part 2: {}", grid.len());
}
	