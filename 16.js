const input = require('fs').readFileSync('./16-input.txt', 'utf-8').split('\n\n').map(part => part.split('\n'))
const notes = input[0].map(note => ({
  field: note.split(':')[0],
  validators: note.split(': ')[1].split(' or ').map(value => value.split('-').map(n => +n))
}))
const myTicket = input[1][1].split(',').map(n => +n)
const nearbyTickets = input[2].slice(1).map(values => values.split(',').map(n => +n))

// const allValidators = notes.map(note => note.values).flat()
// const validateAmongAll = fieldValue => allValidators
//   .every(validator => fieldValue < validator[0] || fieldValue > validator[1])


// const allTicketValues = nearbyTickets.flat()
// const part1 = allTicketValues.filter(validateAmongAll).reduce((a, b) => a + b)

const ticketComposition = nearbyTickets
  .map((_, i) => nearbyTickets.map(ticket => ticket[i]))
  .slice(0, nearbyTickets[0].length)

// const fields = notes.map(({ field: referenceField, values: referenceValues }) => {
//   const fieldIndex = ticketComposition
//     .findIndex(composedFields => composedFields
//       .every(compField => referenceValues
//         .some(refValue => compField >= refValue[0] && compField <= refValue[1]
//         )
//       )
//     )

//   return {
//     field: referenceField,
//     index: fieldIndex
//   }
// }).sort((a, b) => a.index - b.index)

let part2 = {}

for (let note of notes) {
  let index = 0
  let valid = true;
  for (let fieldType of ticketComposition) {
    index++
    for (let fieldValue of fieldType) {
      for (let validator of note.validators) {
        if (fieldValue < validator[0] || fieldValue > validator[1]) {
          valid = false;
          break;
        }
      }
    }
    if (!valid) break;
  }
  if (valid) {
    part2.push({ field: note.field, index })
  }
}

console.log(part2);