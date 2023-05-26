interface IMultipleChoicesProps {
    flag: string,
    answered: boolean
    chosenFlag: string | null,
    choices: string[],
    handleGuessFlag: (option: string) => void
}

const GameMultipleChoices = ({ flag, answered, chosenFlag, choices, handleGuessFlag}: IMultipleChoicesProps) => {

    console.log('guess multiple render')

    return (
        <div className="grid grid-cols-2 gap-4">
        { 
            choices.map( (option, index) => {
                return (
                <button
                    disabled={answered ? true : false}
                    key={index}
                    className={`
                    ${ chosenFlag === flag && chosenFlag === option && 'bg-green-400'} 
                    ${ chosenFlag !== flag && chosenFlag === option && 'bg-red-400'}
                    border-2 p-2 rounded-md sm:hover:border-blue-500`} 
                    onClick={ () => handleGuessFlag(option) }>{option}
                </button>
                )
            })
        }
        </div>
    )

}

export default GameMultipleChoices