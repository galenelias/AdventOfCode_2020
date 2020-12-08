use itertools::Itertools;

#[derive(Copy, Clone, Debug, PartialEq)]
enum Op {
	Nop,
	Acc,
	Jmp,
}

#[derive(Copy, Clone, Debug)]
struct Instruction {
	op: Op,
	arg: i32,
}

fn parse_instruction(line: &String) -> Instruction {
	let parts = line.split(' ').collect_vec();
	Instruction {
		op: match parts[0] {
			"nop" => Op::Nop,
			"acc" => Op::Acc,
			"jmp" => Op::Jmp,
			_ => panic!(),
		},
		arg: parts[1].parse::<i32>().unwrap(),
	}
}

struct RunResult {
	hung: bool,
	acc: i32,
}

fn run_program(program: &[Instruction]) -> RunResult {
	let mut run_instructions = vec![false; program.len()];

	let mut pc = 0i32;
	let mut acc = 0i32;

	while (pc as usize) < program.len() {
		let instruction = program[pc as usize];
		if run_instructions[pc as usize] {
			return RunResult {
				hung: true,
				acc
			};
		} else {
			run_instructions[pc as usize] = true;
		}

		match instruction.op {
			Op::Nop => (),
			Op::Acc => acc += instruction.arg,
			Op::Jmp => pc += instruction.arg - 1,
		};
		pc += 1;
	}

	RunResult { hung: false, acc}
}

pub fn solve(inputs: Vec<String>) {
	let mut program = inputs.iter().map(parse_instruction).collect_vec();

	let part1 = run_program(&program);
	println!("Part 1: {}", part1.acc);

	for i in 0..program.len() {
		if program[i].op == Op::Jmp || program[i].op == Op::Nop {
			let orig_op = program[i].op;
			program[i].op = match orig_op {
				Op::Jmp => Op::Nop,
				Op::Nop => Op::Jmp,
				Op::Acc => panic!(),
			};

			let run_result = run_program(&program);
			if !run_result.hung {
				println!("Part 2: {} (swapped instruction {} ({:?}))", run_result.acc, i, orig_op);
				break;
			}
			program[i].op = orig_op;
		}
	}
}