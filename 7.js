const input = require('fs').readFileSync('./7-input.txt', 'utf-8').replace(/\./g, "").split('\n')

const SHINY_GOLD_BAG = 'shiny gold'
const bagColors = {}
const validColors = {}

for (let str of input) {
  const masterBag = str.split('bags')[0].trim()
  const slaveBags = str.split('contain ')[1].split(', ').map(bag => {
    if (bag === 'no other bags') return null
    return {
      color: bag.split(' ').slice(1, -1).join(' '),
      quantity: +bag.split(' ')[0]
    }
  })
  bagColors[masterBag] = slaveBags[0] === null ? [] : slaveBags
}

const validateBag = insides => {
  let isValidBag = false
  for (let bag of insides) {
    if (bag.color === SHINY_GOLD_BAG) {
      isValidBag = true
    }
    if (bagColors[bag.color]) {
      isValidBag = isValidBag || validateBag(bagColors[bag.color])
    }
  }
  return isValidBag
}
for (let [masterBagColor, insides] of Object.entries(bagColors)) {
  const isValid = validateBag(insides)
  if (isValid) validColors[masterBagColor] = true
}
const result1 = Object.values(validColors).length
console.log(result1);

const shinyGoldBagInsides = bagColors[SHINY_GOLD_BAG]
let result2 = 0
const countBags = insides => {
  for (let bag of insides) {
    result2 += bag.quantity
    for (let i = 0; i < bag.quantity; i++) {
      countBags(bagColors[bag.color])
    }
  }
}
countBags(shinyGoldBagInsides)
console.log(result2);
