const input = require('fs').readFileSync('./11-input.txt', 'utf-8').split('\n')

const copyField = (field) => [...field].map(row => row.split(''))
const countTakenSeats = (field) => field.join('').split('').filter(seat => seat === '#').length

const findAdjacentSeats = ({ field, x, y, strategy }) => {
  const endX = field[0].length - 1
  const endY = field.length - 1;

  if (strategy === 1) {
    const left = x === 0 ? 0 : x - 1
    const right = x === endX ? endX : x + 1
    const top = y === 0 ? 0 : y - 1
    const bottom = y === endY ? endY : y + 1
    const adjacentSeats = [field[y].slice(left, right + 1)]
    if (y !== 0) {
      adjacentSeats.unshift(field[top].slice(left, right + 1))
    }
    if (y !== endY) {
      adjacentSeats.push(field[bottom].slice(left, right + 1))
    }
    return adjacentSeats
  }

  if (strategy === 2) {
    const visibleSeats = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    for (let fieldY = y - 1; fieldY >= 0; fieldY--) {
      if (!visibleSeats[0][1] && field[fieldY][x] !== '.') {
        visibleSeats[0][1] = field[fieldY][x]
      }

      if (!visibleSeats[0][0] && field[fieldY][x - (y - fieldY)] !== '.') {
        visibleSeats[0][0] = field[fieldY][x - (y - fieldY)]
      }
      if (!visibleSeats[0][2] && field[fieldY][x + (y - fieldY)] !== '.') {
        visibleSeats[0][2] = field[fieldY][x + (y - fieldY)]
      }
    }

    for (let fieldY = y + 1; fieldY < field.length; fieldY++) {
      if (!visibleSeats[2][1] && field[fieldY][x] !== '.') {
        visibleSeats[2][1] = field[fieldY][x]
      }

      if (!visibleSeats[2][2] && field[fieldY][x - (y - fieldY)] !== '.') {
        visibleSeats[2][2] = field[fieldY][x - (y - fieldY)]
      }

      if (!visibleSeats[2][0] && field[fieldY][x + (y - fieldY)] !== '.') {
        visibleSeats[2][0] = field[fieldY][x + (y - fieldY)]
      }
    }

    for (let fieldX = x - 1; fieldX >= 0; fieldX--) {
      if (!visibleSeats[1][0] && field[y][fieldX] !== '.') {
        visibleSeats[1][0] = field[y][fieldX]
      }
    }

    for (let fieldX = x + 1; fieldX < field[y].length; fieldX++) {
      if (!visibleSeats[1][2] && field[y][fieldX] !== '.') {
        visibleSeats[1][2] = field[y][fieldX]
      }
    }

    return visibleSeats
  }
}

const checkAdjacentSeats = (adjacentSeats) => {
  const adjacentSeatsTaken = countTakenSeats(adjacentSeats)
  return {
    isFree: adjacentSeatsTaken === 0,
    isSpaciousEnough: adjacentSeatsTaken < 5
  }
}

const fillSeats = (field, strategy) => {
  const newField = copyField(field)

  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] !== 'L') continue
      const adjacentSeats = findAdjacentSeats({ field, x, y, strategy })
      const { isFree } = checkAdjacentSeats(adjacentSeats, strategy)
      if (isFree) newField[y][x] = '#'
    }
  }

  return newField.map(row => row.join(''))
}

const emptySeats = (field, strategy) => {
  const newField = copyField(field)

  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if ('L.'.includes(field[y][x])) continue
      const adjacentSeats = findAdjacentSeats({ field, x, y, strategy })
      const { isSpaciousEnough } = checkAdjacentSeats(adjacentSeats, strategy)
      if (!isSpaciousEnough) newField[y][x] = 'L'
    }
  }

  return newField.map(row => row.join(''))
}

const runSimulation = (field, strategy) => {
  let newField = [...field]
  while (true) {
    const fieldSnapshot = JSON.stringify(newField)
    newField = fillSeats(newField, strategy)
    newField = emptySeats(newField, strategy)
    if (JSON.stringify(newField) === fieldSnapshot) {
      return countTakenSeats(newField)
    }
  }
}

console.log(runSimulation(input, 2));
