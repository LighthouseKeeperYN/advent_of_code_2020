const validatePassword = ({ min, max, symbol, password }) => {
  const occurrences = password.split(symbol).length - 1
  return occurrences >= min && occurrences <= max
}

const result = require('./2-input')
  .split('\n')
  .map(passwords => {
    const arrayProps = passwords.split(' ')
    const range = arrayProps[0].split('-')

    return {
      symbol: arrayProps[1].slice(0, -1),
      min: +range[0],
      max: +range[1],
      password: arrayProps[2]
    }
  })
  .filter(validatePassword)
  .length;

console.log(result)
