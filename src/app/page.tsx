import Grid from "./components/Grid";
import { balloonInterface } from "./interfaces/BalloonInterface";
import { generateBalloons } from "./composibles/game";
import { gameInterface } from "./interfaces/GameInterface";

export default function Home() {
  // create game config, balloons
  const m: number = 5 // grid dimension
  const balloons_n: number = 10 + Math.floor(Math.random() * 8) // number of balloons
  const balloons: Array<balloonInterface> = generateBalloons(m, balloons_n)
  const game_config: gameInterface = {
    m: m,
    balloons: balloons,
    game_over: false,
    game_clear: false
  }

  return (
    <div>
      <Grid game_config={game_config} />
    </div>
  );
}
