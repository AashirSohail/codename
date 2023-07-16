const InputBar = () => {
  return (
    <div className="flex flex-row justify-center items-center mt-4">
      <div className=" mr-6">
        <input
          className="w-[20rem] focus:outline-none py-2 rounded-lg px-2 font-semibold"
          type="text"
          placeholder="hint"
        />
      </div>
      <div className="">
        <input
          className="w-[4.3rem] focus:outline-none py-2 rounded-lg px-2 font-semibold"
          type="number"
          placeholder="word"
          min="1"
        />
      </div>
    </div>
  );
};

export default InputBar;
