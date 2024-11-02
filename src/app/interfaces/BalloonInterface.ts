export interface balloonInterface {
  adjacent: Array<number>
  coord: {
    row: number,
    col: number
  }
  pop: boolean
  pop_order: number
}