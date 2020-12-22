const input = require('fs').readFileSync('./13-input.txt', 'utf-8').split('\n')
const timeStamp = input[0]
const buses = input[1].split(',').filter(bus => bus !== 'x').map((id, i) => ({ id, i }))
// const buses = input[1].split(',')
// const arrivesIn = time => (timeStamp - (timeStamp % time) + time) - timeStamp
// const getClosestBus = () => buses.filter(n => +n).sort((a, b) => arrivesIn(+a) - arrivesIn(+b))[0]
// const closestBus = +getClosestBus()
// const part1 = closestBus * arrivesIn(closestBus)
// console.log(part1);
// var crt = require('nodejs-chinese-remainder');
let n = 1;
let step = 1;
for (let i = 0; i < buses.length; i++) {
  let id = buses[i].id;
  let index = buses[i].i;
  while ((n + index) % id != 0) {
    n += step;
  }
  step *= id;
}

console.log(n);
// console.log(crt);