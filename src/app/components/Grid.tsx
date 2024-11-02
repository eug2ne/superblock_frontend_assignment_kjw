'use client'

import { useEffect, useRef, useState } from 'react'
import { popBalloon } from '../composibles/game'
import { balloonInterface } from '../interfaces/BalloonInterface'
import { gameInterface } from '../interfaces/GameInterface'
import Cell from './Cell'
import Banner from './Banner'
import './components.css'

export default function Grid(props: { game_config: gameInterface }) {
  const { m } = props.game_config
  // set table ref
  const tableRef = useRef(null)
  // set state
  const [game_over, setGameOver] = useState(props.game_config.game_over)
  const [game_clear, setGameClear] = useState(props.game_config.game_clear)
  const [balloons, setBalloons] = useState(props.game_config.balloons)
  const [unpop_balloons_n, setUnpopBalloonsN] = useState(props.game_config.balloons.filter((b: balloonInterface) => !b.pop).length)

  // create cell click event
  const clickCell = (balloon_config: balloonInterface|undefined): void => {
    if (!balloon_config||balloon_config.pop) return

    const new_balloons: Array<balloonInterface>|boolean = popBalloon(balloon_config, balloons)
    if ((new_balloons as Array<balloonInterface>).length) {
      // update balloons
      setBalloons((new_balloons as Array<balloonInterface>))
      // update unpop_balloons_n
      setUnpopBalloonsN(balloons.filter((b: balloonInterface) => !b.pop).length)
    } else {
      if (new_balloons) {
        // game clear
        console.log("game clear")
        setGameClear(true)
      } else {
        // game over
        console.log("game over")
        setGameOver(true)
      }
      return
    }
  }

  // create table cells
  let table_content: Array<React.JSX.Element> = []
  const createTableCell = (r: number): Array<React.JSX.Element> => {
    const cells: Array<React.JSX.Element> = []
    for (let c = 0;c < m;c++) {
      cells.push(
        <Cell key={c} row={r} col={c} balloons={balloons} clickCell={clickCell} />
      )
    }

    return cells
  }
  for (let r = 0;r < m;r++) {
    table_content.push(
      <tr key={r}>
        {createTableCell(r)}
      </tr>
    )
  }
  // set table state
  const [table, setTable] = useState(table_content)

  // update table on state value change
  useEffect(() => {
    // rerender table cells
    table_content = []
    for (let r = 0;r < m;r++) {
      table_content.push(
        <tr key={r}>
          {createTableCell(r)}
        </tr>
      );
    }
    setTable(table_content);

    if (game_clear||game_over) {
      // disable table click event
      (tableRef.current! as HTMLTableElement).style.pointerEvents = "none"
    }
  }, [game_clear, game_over, unpop_balloons_n])

  return (
    <>
      <table ref={tableRef} className="border-separate">
        <tbody>
          {table}
        </tbody>
      </table>
      <Banner game_clear={game_clear} game_over={game_over} />
    </>
  )
}