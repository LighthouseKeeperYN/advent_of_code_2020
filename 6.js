const input = require('fs').readFileSync('./6-input.txt', 'utf-8').split('\r\n\r\n')

const result1 = input
  .map(group => group.replace(/\r\n/g, ''))
  .reduce((sum, group) => sum += [...new Set(group)].length, 0)
console.log(result1)

const getRegex = (length) => new RegExp(`(.)\\1{${length - 1}}`, 'g');
const result2 = input.reduce((sum, group) => {
  const groupSize = group.split('\r\n').length
  const answers = group.replace(/\r\n/g, '').split('').sort().join('')
    .match(getRegex(groupSize))?.length
  return sum += answers || 0
}, 0)
console.log(result2)
