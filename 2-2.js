const validatePassword_1 = ({ min, max, char, passString }) => {
  const occurrences = passString.split(char).length - 1
  return occurrences >= min && occurrences <= max
}

const validatePassword_2 = ({ min, max, char, passString }) => {
  return !!(passString[min - 1] === char) ^ !!(passString[max - 1] === char)
}

const result = require('./2-input')
  .split('\n')
  .map(passwords => {
    const arrayProps = passwords.split(' ')
    const range = arrayProps[0].split('-')

    return {
      char: arrayProps[1].slice(0, -1),
      min: +range[0],
      max: +range[1],
      passString: arrayProps[2]
    }
  })
  .filter(validatePassword_2)
  .length;

console.log(result)
