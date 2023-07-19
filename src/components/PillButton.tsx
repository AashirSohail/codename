interface PillButtonProps {
  text: string
  handleButtonClick?: any
  className?: string
}

const PillButton = ({
  text,
  handleButtonClick,
  className,
}: PillButtonProps) => {
  return (
    <button
      className={`${className} bg-yellow-300 px-3 w-fit py-1 rounded-lg shadow-xl text-xs mt-1`}
      onClick={() => handleButtonClick()}
    >
      {text}
    </button>
  )
}

export default PillButton
