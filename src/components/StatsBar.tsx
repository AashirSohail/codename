import { usePlayersList, myPlayer } from 'playroomkit'
import PillButton from './PillButton'

const StatusBar = () => {
  const players = usePlayersList(true)

  return (
    <div className="flex flex-row justify-between items-center">
      <PillButton
        text={`Players ${players.length}`}
        className="text-base px-8 py-2"
      />
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-row justify-center items-center border-2 border-white pl-2 py-0.5 rounded-full">
          {' '}
          <div className="mr-3"> {myPlayer()?.state?.profile?.name}</div>
          <div
            style={{
              backgroundImage: `url(${myPlayer()?.state?.profile?.photo})`,
              backgroundSize: 'cover',
              width: '2.2rem',
              height: '2.2rem',
              border: `3px solid ${myPlayer()?.state?.profile?.color}`,
              borderRadius: '50%',
            }}
            className="avatar-holder"
          />
        </div>
        <div className="capitalize">
          {myPlayer()?.state?.team + ' ' + myPlayer()?.state?.role}
        </div>
      </div>
    </div>
  )
}

export default StatusBar
