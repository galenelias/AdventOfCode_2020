import { getPuzzleInput } from '../util/input.js'

function isCharDigit(c: string){
	return c >= '0' && c <= '9';
}

interface Context {
	operands: number[];
	operators: string[];
}

function emptyContext(): Context {
	return {
		operands: [],
		operators: [],
	};
}

function doTopOperation(ctx: Context) {
	const op = ctx.operators.pop();
	const val1 = ctx.operands.pop()!;
	const val2 = ctx.operands.pop()!;
	if (op === '+') {
		ctx.operands.push(val1 + val2);
	} else {
		ctx.operands.push(val1 * val2);
	}

}

function eval_expr2(input: string, precedence: Map<string, number>): number {
	let stack: Context[] = [];
	let ctx = emptyContext();
	input = "(" + input + ")"; // Wrap input in parens to simplify logic
	for (let i = 0; i < input.length; i++) {
		const ch = input[i];

		if (ch === ' ') {
			// no-op
		} else if (ch === '(') {
			stack.push(ctx);
			ctx = emptyContext();
		} else if (ch === '+' || ch === '*') {
			// Process all pending operations with higher or equal precedence as incoming operator
			while (ctx.operators.length > 0 && precedence.get(ctx.operators.slice(-1)[0])! >= precedence.get(ch)!) {
				doTopOperation(ctx);
			}

			ctx.operators.push(ch);
		} else if (isCharDigit(ch)) {
			ctx.operands.push(+ch);
		} else if (ch === ')') {
			// Process all remaining operations
			while (ctx.operators.length > 0) {
				doTopOperation(ctx);
			}

			const result = ctx.operands[0];
			ctx = stack.pop()!;
			ctx.operands.push(result);
		} else {
			throw new Error(`Unexpected token ${ch} on line ${input}`);
		}
	}

	return ctx.operands[0]!;
}

async function run() {
	const inputs = await getPuzzleInput();

	const part1Precedence = new Map<string, number>([['+', 1], ['*', 1]]);
	const part1 = inputs.map(line => eval_expr2(line, part1Precedence)).reduce((a,b) => a + b);
	console.log("Part 1:", part1);

	const part2Precedence = new Map<string, number>([['+', 2], ['*', 1]]);
	const part2 = inputs.map(line => eval_expr2(line, part2Precedence)).reduce((a,b) => a + b);
	console.log("Part 2:", part2);
}

run();
