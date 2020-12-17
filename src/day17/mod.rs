use itertools::Itertools;
use std::collections::HashSet;
use std::cmp::{min, max};

#[derive(Copy, Clone, Debug, PartialEq, Eq, Hash)]
struct Coord {
	x: i32, y: i32, z: i32, w: i32,
}

fn count_neighbors(grid: &HashSet<Coord>, pt: &Coord, part: usize) -> usize {
	(0..4).map(|_| -1..=1)
			.multi_cartesian_product().filter(|d| d.iter().any(|d| d != &0) && (part == 2 || d[3] == 0))
			.filter(|d| grid.contains(&Coord{x: pt.x + d[0], y: pt.y + d[1], z: pt.z + d[2], w: pt.w + d[3]}))
			.count()
}

pub fn solve(inputs: Vec<String>) {
	for part in 1..=2 {
		let mut grid = HashSet::<Coord>::new();
		for y in 0..inputs.len() { 
			let row = inputs[y].as_bytes();
			for x in 0..row.len() { 
				if row[x] == '#' as u8 {
					grid.insert(Coord{w: 0, z: 0, y: y as i32, x: x as i32});
				}
			}
		}
	
		for _cycle in 0..6 {
			let mut new_grid = grid.clone();
			let min = grid.iter().cloned().fold1(|a, b| Coord {x: min(a.x, b.x), y: min(a.y, b.y), z: min(a.z, b.z), w: min(a.w, b.w)}).unwrap();
			let max = grid.iter().cloned().fold1(|a, b| Coord {x: max(a.x, b.x), y: max(a.y, b.y), z: max(a.z, b.z), w: max(a.w, b.w)}).unwrap();
	
			for w in (min.w - 1)..=(max.w + 1) {
				for z in (min.z - 1)..=(max.z + 1) {
					for y in (min.y - 1)..=(max.y + 1) {
						for x in (min.x - 1)..=(max.x + 1) {
							let coord = Coord {w, z, y, x};
							let is_active = grid.contains(&coord);
							let neighbors = count_neighbors(&grid, &coord, part);
							if is_active && neighbors != 2 && neighbors != 3 {
								new_grid.remove(&coord);
							} else if !is_active && neighbors == 3 {
								new_grid.insert(coord);
							}
						}
					}
				}
			}
			grid = new_grid;
		}
		println!("Part {}: {}", part, grid.len());
	}
}
	