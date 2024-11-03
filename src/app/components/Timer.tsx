import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { timeToString } from "../composibles/game"

export default function Timer(props: { start: boolean, end: boolean, time: number, setTime: Dispatch<SetStateAction<number>> }) {
  let timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (props.end) {
      // stop timer
      clearInterval((timerRef.current! as NodeJS.Timeout))
      return
    }

    if (props.start) {
      // start timer
      props.setTime(0)
      timerRef.current = setInterval(() => {
        props.setTime((prev_time: number) => prev_time + 1)
      }, 10)
      return
    }
  }, [props.start, props.end])
  
  return (
    <h1 className="mt-10 text-center font-extrabold">
      {props.start ? timeToString(props.time) : "Ready"}
    </h1>
  )
}