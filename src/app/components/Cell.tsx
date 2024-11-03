import { balloonInterface } from "../interfaces/BalloonInterface";
import Balloon from "./Balloon";

export default function Cell(props: { row: number, col: number, balloon: balloonInterface|undefined, clickCell: Function }) {  
  return (
    <td className="relative" onClick={() => props.clickCell(props.balloon)}>
      {props.balloon && <Balloon pop={props.balloon.pop} pop_order={props.balloon.pop_order}/>}
    </td>
  )
}