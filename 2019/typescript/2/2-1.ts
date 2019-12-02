import fs = require("fs");

const INSTRUCTION_SIZE = 4;
const ADD = 1;
const MULTIPLY = 2;
const END = 99;

let fileContents: string = fs.readFileSync('input-1202-state.txt', 'utf8');

function parseInput(input: string): number[] {
    // TODO: Parse string into an array
    // return [1, 0, 0, 0, 99];
    // return [2, 3, 0, 3, 99];
    // return [2, 4, 4, 5, 99, 0];
    // return [1, 1, 1, 4, 99, 5, 6, 0, 99];
    return [1, 12, 2, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 6, 1, 19, 2, 19, 13, 23, 1, 23, 10, 27, 1, 13, 27, 31, 2, 31, 10, 35, 1, 35, 9, 39, 1, 39, 13, 43, 1, 13, 43, 47, 1, 47, 13, 51, 1, 13, 51, 55, 1, 5, 55, 59, 2, 10, 59, 63, 1, 9, 63, 67, 1, 6, 67, 71, 2, 71, 13, 75, 2, 75, 13, 79, 1, 79, 9, 83, 2, 83, 10, 87, 1, 9, 87, 91, 1, 6, 91, 95, 1, 95, 10, 99, 1, 99, 13, 103, 1, 13, 103, 107, 2, 13, 107, 111, 1, 111, 9, 115, 2, 115, 10, 119, 1, 119, 5, 123, 1, 123, 2, 127, 1, 127, 5, 0, 99, 2, 14, 0, 0];
}

let memory: number[] = parseInput(fileContents);

for (let i: number = 0; i < memory.length; i += INSTRUCTION_SIZE) {
    // Load instruction.
    let opCode: number = memory[i];
    let parameter1Address: number = memory[i + 1];
    let parameter1: number = memory[parameter1Address];
    let parameter2Address: number = memory[i + 2];
    let parameter2: number = memory[parameter2Address];
    let storageAddress: number = memory[i + 3];

    // Execute operation
    if (opCode == ADD) {
        memory[storageAddress] = parameter1 + parameter2;
    } else if (opCode == MULTIPLY) {
        memory[storageAddress] = parameter1 * parameter2;
    } else if (opCode == END) {
        console.log("Program complete.");
        break;
    } else {
        console.log("Unknown opcode encountered. Ending program.");
        break;
    }
}

console.log("Result: " + memory);
