const input = require('fs').readFileSync('./14-input.txt', 'utf-8').split('\n')

const cache = {}
const findBitCombinations = (n) => {
  if (cache[n]) return cache[n]
  const states = [];
  const maxDecimal = parseInt('1'.repeat(n), 2);
  for (let i = 0; i <= maxDecimal; i++) {
    states.push(i.toString(2).padStart(n, '0'));
  }
  cache[n] = states
  return states;
}

const applyMaskV1 = (num, mask) => {
  const binary36 = num.toString(2).padStart(36, '0')
  return parseInt(binary36.split('').map((bit, i) => mask[i] === 'X' ? bit : mask[i]).join(''), 2)
}

const applyMaskV2 = (num, mask) => {
  const binary36 = num.toString(2).padStart(36, '0')
  const binary36mod = binary36.split('').map((bit, i) => mask[i] !== '0' ? mask[i] : bit).join('')
  const floatingBitCount = (mask.match(/X/g) || []).length
  const floatingBitIndexes = mask.split('').flatMap((bit, i) => bit === 'X' ? i : []);
  const bitCombinations = findBitCombinations(floatingBitCount)

  return bitCombinations.map((cmb) => {
    const binary36modCopy = binary36mod.split('')
    for (let i = 0; i < floatingBitIndexes.length; i++) {
      binary36modCopy[floatingBitIndexes[i]] = cmb[i]
    }
    return binary36modCopy.join('')
  })
}

const runInterpreter = (input) => {
  const memV1 = []
  const memV2 = {}
  let mask;

  for (line of input) {
    if (line.startsWith('mask')) {
      mask = line.slice(7)
      continue
    }

    const value = Number(line.split(' ')[2])
    const pointer = Number(line.match(/\[(.*?)\]/)[1])
    memV1[pointer] = applyMaskV1(value, mask)
    applyMaskV2(pointer, mask).forEach(modPointer => memV2[modPointer] = value)
  }

  return [memV1, Object.values(memV2)].map(mem => mem.reduce((a, b) => a + b))
}

console.log(runInterpreter(input));