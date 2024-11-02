import { balloonInterface } from "../interfaces/BalloonInterface";

export const generateBalloons = (m: number, balloons_n: number): Array<balloonInterface> => {
  const balloons: Array<balloonInterface> = []

  let random_row: number
  let random_col: number
  for (let i = 0;i < balloons_n;i++) {
    // create balloons with random coords
    random_row = Math.floor(Math.random() * m)
    random_col = Math.floor(Math.random() * m)

    while (balloons.findIndex((b: balloonInterface) => {
      return b.coord.row === random_row && b.coord.col === random_col
    }) != -1) {
      // create new random_row, random_col
      random_row = Math.floor(Math.random() * m)
      random_col = Math.floor(Math.random() * m)
    }

    // add new balloon
    balloons.push({
      adjacent: [],
      coord: { row: random_row, col: random_col },
      pop: false,
      pop_order: 0
    })
  }

  // get adjacent for each balloon
  for (let balloon of balloons) {
    for (let i = 0;i < balloons.length;i++) {
      // add adjacent balloon index to adjacent
      const b: balloonInterface = balloons[i]
      if (Math.abs(b.coord.row - balloon.coord.row) < 2&&Math.abs(b.coord.col - balloon.coord.col) < 2
        &&Math.abs((b.coord.row-balloon.coord.row) * (b.coord.col-balloon.coord.col)) < 2) {
        balloon.adjacent.push(i)
      }
    }
  }

  return balloons
}

export const popBalloon = (balloon: balloonInterface, balloons: Array<balloonInterface>): Array<balloonInterface>|boolean => {
  // check pass
  let unpop_balloons: Array<balloonInterface> = balloons.filter((b: balloonInterface) => !b.pop)
  const largest_adjacent: number = unpop_balloons.toSorted((a: balloonInterface, b: balloonInterface) => {
    return b.adjacent.length - a.adjacent.length
  })[0].adjacent.length
  console.log(largest_adjacent)
  if (balloon.adjacent.length != largest_adjacent) {
    // game over
    return false
  }

  // pop adjacent balloons
  for (const i of balloon.adjacent) {
    balloons[i].pop = true
    balloons[i].pop_order = balloon.adjacent.indexOf(i)
  }

  unpop_balloons = balloons.filter((b: balloonInterface) => !b.pop)
  if (unpop_balloons.length === 0) {
    // game clear
    return true
  }

  // recalculate adjacent
  for (let balloon of balloons) {
    // reset adjacent
    balloon.adjacent = []
    for (let i = 0;i < balloons.length;i++) {
      // add adjacent balloon index to adjacent
      const b: balloonInterface = balloons[i]
      if (b.pop) {}
      else if (Math.abs(b.coord.row - balloon.coord.row) < 2&&Math.abs(b.coord.col - balloon.coord.col) < 2
        &&Math.abs((b.coord.row-balloon.coord.row) * (b.coord.col-balloon.coord.col)) < 2) {
        balloon.adjacent.push(i)
      }
    }
  }

  return balloons
}