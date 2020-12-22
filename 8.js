let input = require('fs').readFileSync('./8-input.txt', 'utf-8').split('\n')

const loadInstructions = () => input.map(line => line.split(' '))
let instructions = loadInstructions();
let cache = {}
let accumulator = 0
let pointer = 0

const reset = () => {
  instructions = loadInstructions();
  cache = {}
  accumulator = 0
  pointer = 0
}

const executeInstruction = (instruction, value) => {
  switch (instruction) {
    case 'acc':
      accumulator += Number(value)
      pointer++
      break;
    case 'jmp':
      pointer += Number(value)
      break;
    case 'nop':
      pointer++
      break;
    default:
      break;
  }
}

const runCode = () => {
  while (pointer < instructions.length) {
    if (cache[pointer]) return accumulator
    cache[pointer] = true
    executeInstruction(...instructions[pointer])
  }
  return true
}

console.log(runCode())
reset()

const targetInstructions = instructions
  .map(([instruction], index) => ({ instruction, index }))
  .filter(({ instruction }) => instruction === 'nop' || instruction === 'jmp')

const repairInstruction = (index) => instructions[index][0] = instructions[index][0] === 'nop' ? 'jmp' : 'nop'

for (let { index } of targetInstructions) {
  reset()
  repairInstruction(index)
  const isCodeOperational = runCode()
  if (isCodeOperational === true) {
    console.log(accumulator)
    break
  };
}