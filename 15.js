const input = [6, 3, 15, 13, 1, 0]

const yolo = (input, lastTurn) => {
  const map = new Map(input.map((n, i) => [n, { n, prevTurn: null, turn: i + 1 }]))
  let lastNum = map.get(input[input.length - 1])

  for (let i = input.length; i < lastTurn; i++) {
    if (lastNum.prevTurn !== null) {
      const n = lastNum.turn - lastNum.prevTurn
      const newNum = { n, prevTurn: map.get(n)?.turn || null, turn: i + 1 }
      map.set(n, newNum)
      lastNum = newNum
    } else {
      const newNum = { n: 0, prevTurn: map.get(0)?.turn || null, turn: i + 1 }
      map.set(0, newNum)
      lastNum = newNum
    }
  }

  return lastNum
}

console.log(yolo(input, 2020))
console.log(yolo(input, 30000000))