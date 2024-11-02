import { balloonInterface } from "../interfaces/BalloonInterface";
import Balloon from "./Balloon";

export default function Cell(props: { row: number, col: number, balloons: Array<balloonInterface>, clickCell: Function }) {
  // get balloon
  let balloon: balloonInterface|undefined = props.balloons.find((b: balloonInterface) => b.coord.row === props.row&&b.coord.col === props.col)

  return (
    <td className="relative" onClick={() => props.clickCell(balloon)}>
      {balloon && <Balloon pop={balloon.pop} pop_order={balloon.pop_order}/>}
    </td>
  )
}