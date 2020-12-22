const input = require('fs').readFileSync('./9-input.txt', 'utf-8').split('\n')

const isTargetNumber = (arr, target) => {
  const numObject = {};
  for (let i = 0; i < arr.length; i++) {
    const thisNum = arr[i];
    numObject[thisNum] = i;
  }
  for (let i = 0; i < arr.length; i++) {
    const diff = target - arr[i];
    if (numObject[diff] > 0 && numObject[diff] !== i) {
      return [i, numObject[diff]]
    }
  }
}

const findTargetNumber = (range) => {
  for (let i = 25; i < range.length; i++) {
    const last25 = range.slice(i - 25, i)
    if (!isTargetNumber(last25, range[i])) {
      return [Number(range[i]), i]
    }
  }
}
const [targetNumber, targetNumberIndex] = findTargetNumber(input)
console.log(targetNumber)

const findContiguousSet = (targetNumber) => {
  const newInput = input.slice(0, targetNumberIndex).map(n => +n).filter(n => n < targetNumber)

  for (let i = 0; i < newInput.length; i++) {
    const possibleRange = newInput.slice(i + 1, newInput.length);
    const testedRange = newInput.slice(i, i + 1);
    for (let ii = i; ii < newInput.length; ii++) {
      testedRange.push(possibleRange.shift())
      const sum = testedRange.reduce((a, b) => a + b)
      if (sum === targetNumber) {
        const sortedRange = testedRange.sort((a, b) => a - b)
        return sortedRange[0] + sortedRange[sortedRange.length - 1]
      }

      if (sum > targetNumber) break
    }
  }
}
console.log(findContiguousSet(targetNumber));