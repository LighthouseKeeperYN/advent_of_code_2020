const input = [require('fs').readFileSync('./17-input.txt', 'utf-8').split('\n').map(y => y.split(''))]

const getNeighbors = (coordinates, size, sizeZ) => {
  const combinations = []
  for (let i = 0; i < 27; i++) {
    combinations.push(i.toString(3).padStart(3, '0').split('').map(n => n - 1));
  }

  return combinations.map(cmb => cmb.map((n, i) => n + coordinates[i]))
    .filter((cmb, i) => cmb.every(n => n >= 0 && n < size) && cmb[0] < sizeZ && i !== 13)
}

const expandSpace = (space) => {
  const generateZLayer = () => Array(size + 2).fill(null).map(() => Array(size + 2).fill('.'))
  const generateYLayer = () => Array(size + 2).fill('.')
  const size = space[0].length

  const newSpace = [generateZLayer()]
  for (let z = 0; z < space.length; z++) {
    const newYLayer = [generateYLayer()]
    for (let y = 0; y < size; y++) {
      const newXLayer = ['.']
      for (let x = 0; x < size; x++) {
        newXLayer.push(space[z][y][x])
      }
      newXLayer.push('.')
      newYLayer.push(newXLayer)
    }
    newYLayer.push(generateYLayer())
    newSpace.push(newYLayer)
  }
  newSpace.push(generateZLayer())


  return newSpace
}

const cycle = space => {
  const oldSpace = expandSpace(space)
  const newSpace = expandSpace(space)
  const sizeZ = newSpace.length
  const size = newSpace[0].length

  for (let z = 0; z < newSpace.length; z++) {
    for (let y = 0; y < newSpace[0].length; y++) {
      for (let x = 0; x < newSpace[0].length; x++) {
        const target = oldSpace[z][y][x]
        const neighborBombs = getNeighbors([z, y, x], size, sizeZ)
          .filter(([nZ, nY, nX]) => oldSpace[nZ][nY][nX] === '#').length

        if (target === '#' && neighborBombs !== 2 && neighborBombs !== 3) {
          newSpace[z][y][x] = '.'
        } else if (target === '.' && neighborBombs === 3) {
          newSpace[z][y][x] = '#'
        }
      }
    }
  }

  return newSpace
}

const EXPLOSION = (input) => {
  let space = input;

  for (let i = 0; i < 6; i++) {
    space = cycle(space)
  }

  return space.flat().flat().filter(cube => cube === '#').length
}

console.log(EXPLOSION(input));
