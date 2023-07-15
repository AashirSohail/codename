import { usePlayersList, myPlayer } from 'playroomkit'

const StatusBar = () => {
  const players = usePlayersList(true)

  return (
    <div className="flex flex-row justify-between items-center">
      <div>Players {players.length}</div>
      <div className="flex flex-row justify-center items-center">
        <div className="mr-3"> {myPlayer()?.state?.profile?.name}</div>
        <div
          style={{
            backgroundImage: `url(${myPlayer()?.state?.profile?.photo})`,
            backgroundSize: 'cover',
            width: '2rem',
            height: '2rem',
            border: `3px solid ${myPlayer()?.state?.profile?.color}`,
            borderRadius: '50%',
          }}
          className="avatar-holder"
        />
      </div>
    </div>
  )
}

export default StatusBar
