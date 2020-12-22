// const input = [require('fs').readFileSync('./17-input.txt', 'utf-8').split('\n')/* .map(y => y.split('')) */]

// const getNeighbors = (coordinates, size, sizeZ, sizeW) => {
//   const combinations = []
//   for (let i = 0; i < 81; i++) {
//     combinations.push(i.toString(3).padStart(4, '0').split('').map(n => n - 1));
//   }

//   return combinations.map(cmb => cmb.map((n, i) => n + coordinates[i]))
//     .filter((cmb) =>
//       cmb.every(n => n >= 0 && n < size)
//       && cmb[0] < sizeW
//       && cmb[1] < sizeZ
//       && JSON.stringify(cmb) !== JSON.stringify(coordinates)
//     )
// }

// const expandSpace = (space) => {
//   const sizeW = space.length
//   const sizeZ = space[0].length
//   const size = space[0][0].length

//   const generateWLayer = () => new Array(sizeZ + 2)
//     .fill(null).map(() => new Array(size + 2).fill('.'.repeat(size + 2)))
//   // .map(() => new Array(size + 2).fill('.')))
//   const generateZLayer = () => new Array(size + 2).fill(null).map(() => '.'.repeat(size + 2))
//   // const generateZLayer = () => new Array(size + 2).fill(null).map(() => new Array(size + 2).fill('.'))
//   const generateYLayer = () => new Array(size + 2).fill('.')

//   const newSpace = [generateWLayer()]
//   for (let w = 0; w < sizeW; w++) {
//     const newZLayer = [generateZLayer()]
//     for (let z = 0; z < sizeZ; z++) {
//       const newYLayer = [generateYLayer()]
//       for (let y = 0; y < size; y++) {
//         const newXLayer = ['.']
//         for (let x = 0; x < size; x++) {
//           newXLayer.push(space[w][z][y][x])
//         }
//         newXLayer.push('.')
//         newYLayer.push(newXLayer)
//       }
//       newYLayer.push(generateYLayer())
//       newZLayer.push(newYLayer)
//     }
//     newZLayer.push(generateZLayer())
//     newSpace.push(newZLayer)
//   }
//   newSpace.push(generateWLayer())

//   return newSpace
// }

// const cycle = space => {
//   const oldSpace = expandSpace(space)
//   const newSpace = expandSpace(space)
//   const sizeW = newSpace.length
//   const sizeZ = newSpace[0].length
//   const size = newSpace[0][0].length

//   for (let w = 0; w < sizeW; w++) {
//     for (let z = 0; z < sizeZ; z++) {
//       for (let y = 0; y < size; y++) {
//         for (let x = 0; x < size; x++) {
//           const target = oldSpace[w][z][y][x]
//           const neighborBombs = getNeighbors([w, z, y, x], size, sizeZ, sizeW)
//             .filter(([nW, nZ, nY, nX]) => oldSpace[nW][nZ][nY][nX] === '#').length

//           if (target === '#' && neighborBombs !== 2 && neighborBombs !== 3) {
//             newSpace[w][z][y][x] = '.'
//           } else if (target === '.' && neighborBombs === 3) {
//             newSpace[w][z][y][x] = '#'
//           }
//         }
//       }
//     }
//   }

//   return newSpace
// }

// const EXPLOSION = (input) => {
//   let space = input;

//   for (let i = 0; i < 6; i++) {
//     space = cycle(space)
//   }

//   return space.flat().flat().flat().filter(cube => cube === '#').length
// }

// console.log(EXPLOSION(input));

const fs = require('fs');
const { parse } = require('path');

const lines = fs.readFileSync('./17-input.txt', { encoding: 'utf-8' }).split('\n').filter(x => x).map(x => [...x]);

let map = new Map(); // key: x,y,z,w value: active/inactive

//initalize the map

lines.forEach((line, y) => {
  line.forEach((value, x) => {
    const active = value === '#';
    const id = [x, y, 0, 0].join`,`;
    map.set(id, active);
  })
})

function getNeighbours(x, y, z, w, map) {
  const result = [];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let l = w - 1; l <= w + 1; l++) {
          if (i != x || j != y || k != z || l != w) {
            const key = [i, j, k, l].join`,`
            // if(x == 0 && y == 0 && z == 0) {
            //     console.log(key, map.has(key));
            // }
            // console.log(key, map.has(key));
            if (map.has(key)) {
              result.push(map.get(key));
            } else {
              result.push(false);
            }
          }
        }
      }
    }
  }
  return result;
}

for (let i = 0; i < 6; i++) { // turn

  //find min-max for x,y,z
  const keys = map.keys();
  let minx = null;
  let miny = null;
  let minz = null;
  let minw = null;
  let maxx = null;
  let maxy = null;
  let maxz = null;
  let maxw = null;

  for (const key of keys) {
    const [x, y, z, w] = key.split(',').map(x => parseInt(x));
    if (x < minx) minx = x;
    if (y < miny) miny = y;
    if (z < minz) minz = z;
    if (w < minw) minw = w;
    if (x > maxx) maxx = x;
    if (y > maxy) maxy = y;
    if (z > maxz) maxz = z;
    if (w > maxw) maxw = w;
  }

  const newState = new Map(); 

  for (let x = minx - 1; x <= maxx + 1; x++) {
    for (let y = miny - 1; y <= maxy + 1; y++) {
      for (let z = minz - 1; z <= maxz + 1; z++) {
        for (let w = minw - 1; w <= maxw + 1; w++) {
          const neighbours = getNeighbours(x, y, z, w, map);
          const activeNeibours = neighbours.filter(x => x).length;
          const key = [x, y, z, w].join`,`;
          const isActive = map.has(key) ? map.get(key) : false;
          if (isActive && activeNeibours !== 2 && activeNeibours !== 3) {
            newState.set(key, false);
          } else if (!isActive && activeNeibours === 3) {
            newState.set(key, true);
          } else {
            newState.set(key, isActive);
          }
        }
      }
    }
  }

  map = newState;
}

// count active cubes
let sum = 0;
let cubes = map.values();
for (const cube of cubes) {
  if (cube) sum++;
}

console.log(sum);