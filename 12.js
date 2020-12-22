const input = require('fs').readFileSync('./12-input.txt', 'utf-8').split('\n')
  .map(str => ({
    instruction: str[0],
    value: Number(str.slice(1))
  }))

const manhattanDistance = (a, b) => Math.abs(a) + Math.abs(b)

const part1 = () => {
  const shipCoordinates = [0, 0]
  let shipDirection = 1 // N E S W

  for (let { instruction, value } of input) {
    switch (instruction) {
      case 'N': shipCoordinates[0] += value; break
      case 'E': shipCoordinates[1] += value; break
      case 'S': shipCoordinates[0] -= value; break
      case 'W': shipCoordinates[1] -= value; break
      case 'R': shipDirection = (shipDirection + value / 90) % 4; break
      case 'L': shipDirection = Math.abs((shipDirection - value / 90 + 4) % 4); break
      case 'F':
        if (shipDirection <= 1) {
          shipCoordinates[shipDirection] += value
        } else {
          shipCoordinates[shipDirection - 2] -= value
        }
        break;
      default: break
    }
  }

  return manhattanDistance(...shipCoordinates)
}

const part2 = () => {
  const shipCoordinates = [0, 0]
  let wayPoint = [1, 10]

  for (let { instruction, value } of input) {
    switch (instruction) {
      case 'N': wayPoint[0] += value; break
      case 'E': wayPoint[1] += value; break
      case 'S': wayPoint[0] -= value; break
      case 'W': wayPoint[1] -= value; break
      case 'R': switch (value % 360) {
        case 90: wayPoint = [-wayPoint[1], wayPoint[0]]; break
        case 180: wayPoint = [-wayPoint[0], -wayPoint[1]]; break
        case 270: wayPoint = [wayPoint[1], -wayPoint[0]]; break
      }
        break;
      case 'L': switch (value % 360) {
        case 90: wayPoint = [wayPoint[1], -wayPoint[0]]; break
        case 180: wayPoint = [-wayPoint[0], -wayPoint[1]]; break
        case 270: wayPoint = [-wayPoint[1], wayPoint[0]]; break
      }
        break;
      case 'F':
        shipCoordinates[0] += (wayPoint[0] * value)
        shipCoordinates[1] += (wayPoint[1] * value)
        break;
      default: break
    }
  }

  return manhattanDistance(...shipCoordinates)
}

console.log(part2())