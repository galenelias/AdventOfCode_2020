import { assert } from 'console';
import { getPuzzleInput } from '../util/input.js'

function isCharDigit(c: string){
	return c >= '0' && c <= '9';
}

interface Context {
	operand: number | null;
	operator: string | null;
}

function emptyContext(): Context {
	return {
		operand: null,
		operator: null,
	};
}

function eval_expr(input: string): number {
	let stack: Context[] = [];
	let ctx = emptyContext();
	for (let i = 0; i < input.length; i++) {
		let ch = input[i];

		if (ch === '(') {
			stack.push(ctx);
			ctx = emptyContext();
		} else if (ch === '+' || ch === '*') {
			assert(ctx.operator === null);
			ctx.operator = ch;
		} else if (ch === ' ') {
			// no-op
		} else {
			let num:number = 0;

			if (isCharDigit(ch)) {
				num = +ch;
			} else if (ch === ')') {
				assert(ctx.operator === null);
				assert(ctx.operand !== null);
				num = ctx.operand!;
				ctx = stack.pop()!;
			} else {
				throw new Error("Unexpected");
			}

			if (ctx.operator !== null) {
				let op = ctx.operator;
				ctx.operator = null;
				if (ctx.operand === null) {
					throw new Error("Unexpected");
				}
				if (op == '+') {
					ctx.operand! += num;
				} else if (op == '*') {
					ctx.operand! *= num;
				}
			} else {
				ctx.operand = num;
			}
		}
	}

	// console.log(`Eval ${input} = ${ctx.operand!}`);
	return ctx.operand!;
}

interface Context2 {
	operands: number[];
	operators: string[];
}

function emptyContext2(): Context2 {
	return {
		operands: [],
		operators: [],
	};
}

function eval_expr2(input: string): number {
	let stack: Context2[] = [];
	let ctx = emptyContext2();
	input = "(" + input + ")";
	for (let i = 0; i < input.length; i++) {
		let ch = input[i];

		if (ch === ' ') {
			// no-op
		} else if (ch === '(') {
			stack.push(ctx);
			ctx = emptyContext2();
		} else if (ch === '+' || ch === '*') {
			if (ctx.operators.length > 0) {
				const top_op = ctx.operators[ctx.operators.length-1];
				if (top_op === '+' || (ch === '*' && top_op === '*')) {
					let val1 = ctx.operands.pop()!;
					let val2 = ctx.operands.pop()!;
					if (top_op === '+') {
						ctx.operands.push(val1 + val2);
					} else {
						ctx.operands.push(val1 * val2);
					}
					ctx.operators.pop();
				}
			}

			ctx.operators.push(ch);
		} else {
			let num:number = 0;

			if (isCharDigit(ch)) {
				num = +ch;
			} else if (ch === ')') {
				while (ctx.operators.length > 0) {
					const top_op = ctx.operators.pop();
					let val1 = ctx.operands.pop()!;
					let val2 = ctx.operands.pop()!;
					if (top_op === '+') {
						ctx.operands.push(val1 + val2);
					} else {
						ctx.operands.push(val1 * val2);
					}
				}

				// TODO: Evaluate
				num = ctx.operands[0];
				ctx = stack.pop()!;
			} else {
				throw new Error("Unexpected");
			}

			ctx.operands.push(num);
		}
	}

	// console.log(`Eval ${input} = ${ctx.operands[0]}`);
	return ctx.operands[0]!;
}

async function run() {
	const inputs = await getPuzzleInput();

	let part1 = 0;
	for (const line of inputs) {
		part1 += eval_expr(line);
	}
	console.log("Part 1:", part1);

	let part2 = 0;
	for (const line of inputs) {
		part2 += eval_expr2(line);
	}
	console.log("Part 2:", part2);
}

run();
