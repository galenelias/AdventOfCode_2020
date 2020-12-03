use itertools::Itertools;

// Returns how many trees were hit
fn sled(grid: &Vec<Vec<char>>, dy: usize, dx: usize) -> usize {
	let mut x = 0;
	let mut trees = 0;

	for y in (0..grid.len()).step_by(dy) {
		if grid[y][x % grid[y].len()] == '#' {
			trees += 1;
		}
		x += dx;
	}
	return trees;
}

pub fn solve(inputs: Vec<String>) {
	let grid = inputs.iter().map(|line| line.chars().collect_vec()).collect_vec();

	println!("Part 1: {}", sled(&grid, 1, 3));

	let dirs = [(1, 1), (1, 3), (1, 5), (1, 7), (2, 1)];
	let part2 = dirs.iter().map(|(dy, dx)| sled(&grid, *dy, *dx)).product::<usize>();
	println!("Part 2: {}", part2);
}