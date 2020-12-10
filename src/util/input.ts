import * as fs from 'fs';

async function read(stream: any): Promise<string> {
	const chunks = [];
	for await (const chunk of stream) chunks.push(chunk);
	return Buffer.concat(chunks).toString("utf8");
}

export async function readStdInToLines(): Promise<string[]> {
	const stdin = await read(process.stdin);
	return stdin.split('\n');
}

// Get puzzle input either from stdin if a filename wasn't passed, or from the
// first argument if one was given
export async function getPuzzleInput(): Promise<string[]> {
	const myArgs = process.argv.slice(2);
	if (myArgs.length > 0) {
		var data = fs.readFileSync(myArgs[0]).toString("utf8");
		return data.trimEnd().split('\n');
	} else {
		const stdin = await read(process.stdin);
		return stdin.trimEnd().split('\n');
	}
}