import React, { Children, DOMElement, ElementRef, MutableRefObject, ReactElement, useEffect, useRef, useState } from "react"

export default function Balloon(props: { pop: boolean, pop_order: number }) {
  const [popping, setPopping] = useState(false)
  const balloonRef = useRef(null)
  const audioRef = useRef(null)

  const smile_image: React.JSX.Element = (<img src="/smile.svg" className="smile" />)
  const pop_image: React.JSX.Element = (<img src="/pop.svg" />)
  const balloon_image: React.JSX.Element = (<img src="/balloon.svg" />) // default image
  // create pop event
  useEffect(() => {
    if (props.pop&&!popping) {
      setTimeout(() => {
        // show pop_image
        setPopping(true);
        // play pop sfx
        // (audioRef.current! as HTMLAudioElement).play()
        // BUG: balloon pop lagging due to redundant table rendering

        // set balloon to invisible
        setTimeout(() => {
          (balloonRef.current! as HTMLDivElement).classList.add("invisible")
          setPopping(false)
        }, 100)
      }, 200+100*props.pop_order)
    }
  }, [props.pop])

  return (
    <div ref={ balloonRef } className="balloon absolute top-3.5 left-3.5">
      <audio ref={audioRef} src="/sfx/balloon_pop.wav"></audio>
      {popping ?
      pop_image : props.pop ? smile_image : balloon_image}
    </div>
  )
}