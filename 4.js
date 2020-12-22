const { readFileSync } = require('fs');
const input = readFileSync('./4-input.txt', { encoding: 'UTF-8' }).split('\n\n')

const requiredFields = [
  /eyr:(202[0-9]|2030)\b/,
  /hgt:((1[5-8][0-9]|19[0-3])cm)|((59|6[0-9]|7[0-6])in)\b/,
  /iyr:(201[0-9]|2020)\b/,
  /pid:([0-9]{9})\b/,
  /ecl:(amb|blu|brn|gry|grn|hzl|oth)\b/i,
  /hcl:#([0-9a-f]{6}|[0-9a-f]{3})\b/i,
  /byr:(19[2-8][0-9]|199[0-9]|200[0-2])\b/,
]
const validatePassport = (passport) => requiredFields.every(field => passport.match(field))
const result = input.filter(validatePassport).length
console.log(result);
