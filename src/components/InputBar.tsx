const InputBar = ({ hintTimer, teamTurn, me, hint, setHint }: any) => {
  console.log('hint', hint)
  return (
    <>
      {me?.role === 'spymaster' && me?.team === teamTurn && hintTimer > 0 ? (
        <div className="flex flex-row justify-center items-center mt-4">
          <div className=" mr-6">
            <input
              className="w-[20rem] focus:outline-none py-2 rounded-lg px-2 font-semibold"
              type="text"
              placeholder="hint"
              onChange={(event: any) =>
                setHint({ ...hint, text: event.target.value })
              }
            />
          </div>
          <div className="">
            <input
              className="w-[4.3rem] focus:outline-none py-2 rounded-lg px-2 font-semibold"
              type="number"
              placeholder="word"
              min="1"
              onChange={(event) =>
                setHint({ ...hint, count: event.target.value })
              }
            />
          </div>
        </div>
      ) : (
        <span>
          {hint.text} {hint.count}
        </span>
      )}
    </>
  )
}

export default InputBar
