const { readFileSync } = require('fs');
const input = readFileSync('./3-input.txt', { encoding: 'UTF-8' })
  .split('\n')
  .map((row) => row.replace('\r', ''));

const configs = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

const countTrees = ([configX, configY]) => {
  let trees = 0;
  for (
    let x = 0, y = 0;
    y < input.length;
    x += configX, x %= input[0].length, y += configY
  ) {
    if (input[y][x] === '#') trees++;
  }
  return trees;
};

const result = configs.map((config) => countTrees(config)).reduce((a, b) => a * b);
console.log(result); // 3521829480
