import { useEffect, useRef } from "react"

export default function Banner(props: { game_over: boolean, game_clear: boolean }) {
  const overAudioRef = useRef(null)
  const clearAudioRef = useRef(null)
  const smile_image: React.JSX.Element = (<img src="/smile.svg"/>)
  const upset_image: React.JSX.Element = (<img src="/upset.svg"/>)

  useEffect(() => {
    if (props.game_over) {
      // play game_over audio
      (overAudioRef.current! as HTMLAudioElement).play()
    }
    if (props.game_clear) {
      // play game_clear audio
      (clearAudioRef.current! as HTMLAudioElement).play()
    }
  })

  // create game restart event
  const clickRestart: React.MouseEventHandler = (e: React.MouseEvent) => {
    // reload page
    window.location.reload()
  }

  return (
    <div className="w-full h-full z-10">
      <audio ref={overAudioRef} src="/sfx/game_over.wav"></audio>
      <audio ref={clearAudioRef} src="/sfx/game_clear.wav"></audio>
      {(props.game_clear||props.game_over) &&
      <div className="absolute w-full h-fit top-1/4 bg-slate-500 bg-opacity-65">
        <ul className="flex flex-col w-fit h-fit mx-auto justify-center justify-items-center content-center items-center">
          <div className="w-20 h-20 mt-4">
            {props.game_over && upset_image}
            {props.game_clear && smile_image}
          </div>
          <h1 className="m-2 text-2xl text-center font-bold">
            {props.game_over && "Game Over"}
            {props.game_clear && "Game Clear"}
          </h1>
          <button className="m-2 p-2 w-20 h-30 text-lg text-center underline font-bold rounded-md bg-slate-400">
            Retry?
            <img src="/refresh.svg" alt="restart button" onClick={clickRestart} />
          </button>
        </ul>
      </div>}
    </div>
  )
}