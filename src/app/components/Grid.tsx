'use client'

import { useEffect, useRef, useState } from 'react'
import { popBalloon } from '../composibles/game'
import { balloonInterface } from '../interfaces/BalloonInterface'
import { gameInterface } from '../interfaces/GameInterface'
import Timer from './Timer'
import Cell from './Cell'
import Banner from './Banner'
import './components.css'

// TODO: add timer?

export default function Grid(props: { game_config: gameInterface }) {
  const { m } = props.game_config
  // set table ref
  const tableRef = useRef(null)
  // set state
  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)
  const [time, setTime] = useState(0)
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
      const new_unpop_balloons_n: number = (new_balloons as Array<balloonInterface>)
        .filter((b: balloonInterface) => !b.pop).length
      setUnpopBalloonsN(new_unpop_balloons_n)

      if (new_unpop_balloons_n === 0) {
        // game clear
        console.log("game clear")
        // render table
        setTable(createTable(m, table, false) as never[]);
        setEnd(true)
        setGameClear(true)
      }
    } else {
      // game over
      console.log("game over")
      setEnd(true)
      setGameOver(true)
      return
    }
  }

  // create table
  const createTableCell = (r: number, m: number, cells: Array<React.JSX.Element>, empty: boolean): Array<React.JSX.Element> => {
    for (let c = 0;c < m;c++) {
      const balloon: balloonInterface|undefined = balloons.find((b: balloonInterface) => b.coord.row === r&&b.coord.col === c)
      cells[c] = (
        <Cell key={c} row={r} col={c} balloon={empty ? undefined : balloon} clickCell={clickCell} />
      )
    }

    return cells
  }
  const createTable = (m: number, table: Array<React.JSX.Element>, empty: boolean): Array<React.JSX.Element> => {
    for (let r = 0;r < m;r++) {
      const cells: Array<React.JSX.Element> = table[r] ? table[r].props.children : [];
      (table as Array<React.JSX.Element>)[r] = (
        <tr key={r}>{createTableCell(r, m, cells, empty)}</tr>
      )
    }

    return table
  }
  const [table, setTable] = useState(createTable(m, [], true)) // default empty table

  // update table on state value change
  useEffect(() => {
    // render table
    setTable(createTable(m, table, false));

    if (game_clear||game_over) {
      // disable table click event
      (tableRef.current! as HTMLTableElement).style.pointerEvents = "none"
    }
  }, [game_clear, game_over, unpop_balloons_n])

  // start game
  useEffect(() => {
    if (!start&&!end) {
      // disable table click event
      (tableRef.current! as HTMLTableElement).style.pointerEvents = "none"
      
      // start game
      const start_timer = setTimeout(() => {
        // enable table click event
        (tableRef.current! as HTMLTableElement).style.pointerEvents = "auto"
        setStart(true)
        clearTimeout(start_timer)
      }, 1000)
    }
  }, [start, end])

  return (
    <>
      <Timer start={start} end={end} time={time} setTime={setTime} />
      <table ref={tableRef} className="border-separate">
        <tbody>
          {table}
        </tbody>
      </table>
      <Banner game_clear={game_clear} game_over={game_over} record={time} />
    </>
  )
}