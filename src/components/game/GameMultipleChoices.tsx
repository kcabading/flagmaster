import { useEffect } from "react"

interface IMultipleChoicesProps {
    flag: string,
    answered: boolean
    chosenFlag: string | null,
    choices: string[],
    handleGuessFlag: (option: string) => void,
    powerUps: string[]
}

const GameMultipleChoices = ({ flag, answered, chosenFlag, choices, handleGuessFlag, powerUps}: IMultipleChoicesProps) => {

    useEffect( () => {
        console.log('powerups')
        console.log(powerUps)
        if (powerUps.includes('5050')) {
            let correctAnswerButton
            // let randomChoices = Math.floor(Math.random() * 4)
            let allInputs:HTMLCollection = document.getElementsByClassName('flag-choices')
            console.log(allInputs)
            console.log(flag)

            Array.from(allInputs).forEach( (element:any, index) => {
                if (element.innerText === flag) {
                    correctAnswerButton = index
                }
            })

            let randomChoices: number[] = []

            while(randomChoices.length < 2) {
                let randomIndex = Math.ceil(Math.random() * 3)
                if (randomIndex === correctAnswerButton || randomChoices.includes(randomIndex)) continue
                randomChoices.push(randomIndex)
            }

            console.log(randomChoices)

            Array.from(allInputs).forEach( (element:any, index) => {
                if (randomChoices.includes(index)) {
                    element.innerText = '-'
                    element.setAttribute('disabled', 'true')
                }
            })

            console.log(correctAnswerButton)
            
        } 

    }, [powerUps])

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
                        border-2 p-2 rounded-md sm:hover:border-blue-500 flag-choices`} 
                        onClick={ () => handleGuessFlag(option) }>{option}
                    </button>
                )
            })
        }
        </div>
    )

}

export default GameMultipleChoices