const input = require('fs').readFileSync('./5-input.txt', 'utf-8').split('\n')

const getRange = ([floor, ceil], isCeil) => {
  const newFloor = floor + Math.ceil((ceil - floor) / 2)
  const newCeil = ceil - Math.ceil((ceil - floor) / 2)
  return isCeil ? [newFloor, ceil] : [floor, newCeil]
}

const coordinates = input.map(seat => {
  const row = seat.slice(0, 7).split('').map(dir => dir === 'B').reduce(getRange, [0, 127])[0]
  const column = seat.slice(7, seat.length).split('').map(dir => dir === 'R').reduce(getRange, [0, 7])[0]
  return [row, column]
})

const IDs = coordinates.map(([row, column]) => row * 8 + column).sort((a, b) => b - a)

const hightestID = IDs[0]
console.log(hightestID)

const possibleIDs = Array(128).fill([0, 1, 2, 3, 4, 5, 6, 7])
  .map((row, rowIndex) => row.map(column => rowIndex * 8 + column))
  .flat()
  .sort((a, b) => b - a)
  .filter(id => id <= IDs[0] && id >= IDs[IDs.length - 1])

const missingID = possibleIDs.find((id, i) => id !== IDs[i])
console.log(missingID)
