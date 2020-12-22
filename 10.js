const input = require('fs').readFileSync('./10-input.txt', 'utf-8').split('\r\n')
  .map(n => Number(n))
  .sort((a, b) => a - b)

const countDifferences = () => {
  let counter = [0, 0, 1]
  counter[input[0] - 1]++
  for (let i = 0; i < input.length - 1; i++) {
    counter[input[i + 1] - input[i] - 1]++
  }
  return counter
}

console.log(countDifferences());

const cache = {}
const countCombinations = (arr, base = 0) => {
  const hashKey = JSON.stringify(arr)
  if (hashKey in cache) return cache[hashKey]

  let counter = 0;

  if (arr.length === 1) return 1

  const check = arr.slice(0, 3)

  if (check.length === 0) return 1

  check.forEach((n, i) => {
    const next = arr.slice(i + 1);
    counter += n - base <= 3 ? countCombinations(next, n) : 0;
  })

  cache[hashKey] = counter;

  return counter;
}

console.log(countCombinations(input))
