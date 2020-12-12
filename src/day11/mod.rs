use itertools::Itertools;

fn get(grid: &Vec<Vec<char>>, r: isize, c: isize) -> char {
	if r >= 0 && c >= 0 && r < grid.len() as isize && c < grid[r as usize].len() as isize {
		grid[r as usize][c as usize]
	} else {
		'L' // handle out of bounds requests as 'L' so part 2 stops casting rays at the boundaries
	}
}

fn count_adjacent(grid: &Vec<Vec<char>>, r: isize, c: isize) -> usize {
	let mut count = 0;
	for (dr, dc) in &[(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)] {
		if get(grid, r + dr, c + dc) == '#' {
			count += 1;
		}
	}
	return count;
}

fn count_adjacent2(grid: &Vec<Vec<char>>, r: isize, c: isize) -> usize {
	let mut count = 0;
	for (dr, dc) in &[(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)] {
		for i in 1.. {
			let ch = get(grid, r + i * dr, c + i * dc);
			if ch == '.' {
				continue;
			} else if ch == '#' {
				count += 1;
			}
			break;
		}
	}
	return count;
}

fn part1(mut grid: Vec<Vec<char>>) {
	loop {
		let mut new_grid = grid.clone();
		for r in 0..grid.len() {
			for c in 0..grid[r].len() {
				let ch = grid[r][c];
				if ch == 'L' && count_adjacent(&grid, r as isize, c as isize) == 0 {
					new_grid[r][c] = '#';
				} else if ch == '#' && count_adjacent(&grid, r as isize, c as isize) >= 4 {
					new_grid[r][c] = 'L';
				}
			}
		}

		if &new_grid == &grid {
			break;
		} else {
			grid = new_grid;
		}
	}

	println!("Part 1: {}", grid.iter().map(|row| row.iter().filter(|ch| *ch == &'#').count()).sum::<usize>());
}

fn part2(mut grid: Vec<Vec<char>>) {
	loop {
		let mut new_grid = grid.clone();
		for r in 0..grid.len() {
			for c in 0..grid[r].len() {
				let ch = grid[r][c];
				if ch == 'L' && count_adjacent2(&grid, r as isize, c as isize) == 0 {
					new_grid[r][c] = '#';
				} else if ch == '#' && count_adjacent2(&grid, r as isize, c as isize) >= 5 {
					new_grid[r][c] = 'L';
				}
			}
		}

		if &new_grid == &grid {
			break;
		} else {
			grid = new_grid;
		}
	}

	println!("Part 2: {}", grid.iter().map(|row| row.iter().filter(|ch| *ch == &'#').count()).sum::<usize>());
}

pub fn solve(inputs: Vec<String>) {
	let grid: Vec<Vec<char>> = inputs.iter().map(|s| s.chars().collect_vec()).collect_vec();

	part1(grid.clone());
	part2(grid.clone());
}