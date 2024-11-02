import { balloonInterface } from "./BalloonInterface";

export interface gameInterface {
  m: number // dimension of grid
  balloons: Array<balloonInterface>
  game_over: boolean
  game_clear: boolean
}