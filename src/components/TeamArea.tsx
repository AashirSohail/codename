const TeamArea = ({ team, cardCount, players }: any) => {
  return (
    <div>
      <div className="capitalize">
        Team {team} {cardCount?.[team]}
      </div>
      <div>Operative(s)</div>

      {players
        .filter(
          (player: any) =>
            player.state.team === team && player.state.role === 'operative',
        )
        .map((player: any) => (
          <span key={player.id}>{player?.state?.profile?.name}</span>
        ))}
      <div>Spymaster(s)</div>
      {players
        .filter(
          (player: any) =>
            player.state.team === team && player.state.role === 'spymaster',
        )
        .map((player: any) => (
          <span key={player.id}>{player?.state?.profile?.name}</span>
        ))}
    </div>
  )
}

export default TeamArea
