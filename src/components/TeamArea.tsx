import PillButton from '@/components/PillButton'
import Image from 'next/image'

const TeamArea = ({
  team,
  cardCount,
  players,
  me,
  hintTimer,
  guessTimer,
  teamTurn,
}: any) => {
  const setRole = (team: string, role: string) => {
    me.setState('team', team)
    me.setState('role', role)
  }
  return (
    <div>
      <div
        className={`h-52 w-64 rounded-lg shadow-3xl bg-gradient-to-b ${
          team === 'red'
            ? 'from-darkRed to-lightRed'
            : 'from-darkBlue to-lightBlue'
        } border-2 border-white p-2`}
      >
        <div className="flex justify-between p-2 relative h-full border-2 border-black shadow-xl rounded-lg">
          <Image
            src="/images/agent.png"
            height={70}
            width={70}
            alt="agent-icon"
            className="absolute right-1 bottom-0"
          />
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <span>Operative(s)</span>
              <span className="text-xs">
                {players
                  .filter(
                    (player: any) =>
                      player.state.team === team &&
                      player.state.role === 'operative',
                  )
                  .map((player: any) => (
                    <span key={player.id}>{player?.state?.profile?.name}</span>
                  ))}
              </span>
              <PillButton
                text="Join as Operative(s)"
                handleButtonClick={() => setRole(team, 'operative')}
              />
            </div>
            <div className="flex flex-col">
              <span>Spymaster(s)</span>
              <span className="text-xs">
                {players
                  .filter(
                    (player: any) =>
                      player.state.team === team &&
                      player.state.role === 'spymaster',
                  )
                  .map((player: any) => (
                    <span key={player.id}>{player?.state?.profile?.name}</span>
                  ))}
              </span>
              <PillButton
                text="Join as Spymaster(s)"
                handleButtonClick={() => setRole(team, 'spymaster')}
              />
            </div>
          </div>
          <span className="text-5xl font-semibold p-2">
            {cardCount?.[team]}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TeamArea
