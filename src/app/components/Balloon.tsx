import React, { Children, DOMElement, ElementRef, MutableRefObject, ReactElement, useEffect, useRef, useState } from "react"

export default function Balloon(props: { pop: boolean, pop_order: number }) {
  const [processing, setProcessing] = useState(false)
  const balloonRef = useRef(null)
  const audioRef = useRef(null)

  const smile_image: React.JSX.Element = (<img src="/smile.svg" className="smile" />)
  const pop_image: React.JSX.Element = (<img src="/pop.svg" />)
  const balloon_image: React.JSX.Element = (<img src="/balloon.svg" />) // default image
  // create pop event
  useEffect(() => {
    if (props.pop) {
      setTimeout(() => {
        if ((balloonRef.current! as HTMLDivElement).classList.contains("invisible")) return

        // show pop_image
        setProcessing(true);
        // play pop sfx
        (audioRef.current! as HTMLAudioElement).play()
        // set balloon to invisible
        setTimeout(() => {
          (balloonRef.current! as HTMLDivElement).classList.add("invisible")
        }, 100)
      }, 200+200*props.pop_order)
    }
  })

  return (
    <div ref={ balloonRef } className="balloon absolute top-3.5 left-3.5">
      <audio ref={audioRef} src="/sfx/balloon_pop.wav"></audio>
      {processing ?
      pop_image : props.pop ? smile_image : balloon_image}
    </div>
  )
}