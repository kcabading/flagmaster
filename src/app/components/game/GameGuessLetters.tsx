import { useCallback, KeyboardEvent, useState, useEffect } from "react"

interface FlagLetterProps {
    flagLetters: string,
    handleCorrectAnswer: (guess: string) => void,
    handleIncorrectAnswer: () => void,
    handleSkip: () => void
}

type GuessLetter = {
    value: string,
    order: number | null
}


const GameGuessLetters = ({ flagLetters, handleCorrectAnswer, handleIncorrectAnswer, handleSkip }: FlagLetterProps)  => {

    const [ isCorrect, setIsCorrect ] = useState<boolean | null>(null)
    const [ guessLetters, setGuessLetters] = useState<GuessLetter[]>([])
    const [ skipFlag, setSkipFlag ] = useState<boolean>(false)

    const handleOnChange = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        setIsCorrect(null)
        let currentInput = e.target as HTMLInputElement
        let currentOrder = Number(currentInput.dataset.order)
        let letterInputs:HTMLCollection = document.getElementsByClassName("letter-inputs")

        console.log(e.key)
        
        let nextInputIndex:number = 0

        function allInputsFilled() {
            return Array.from(letterInputs).every( (element:any) => element.value !== '')
        }

        if(e.key === 'Shift' || e.key === 'Capslock') return
        if(e.key === 'Backspace' || e.key === 'ArrowLeft') {
            
            nextInputIndex = currentOrder -1
            let prevInput = letterInputs[nextInputIndex] as HTMLInputElement  
            if (nextInputIndex >= 0 && nextInputIndex < letterInputs.length) {
                prevInput.focus()
            }
            
        } else {

            if (currentInput.value && e.key.length === 1 ) currentInput.value = e.key
            if (!currentInput.value) return

            nextInputIndex = currentOrder + 1

            let nextInput = letterInputs[nextInputIndex] as HTMLInputElement  

            if (allInputsFilled() && e.key.length === 1) {

                let guessAnswer: string = ''
                
                Array.from(letterInputs).map((inputEl:any, index) => {
                    console.log(inputEl.value)
                    guessAnswer += inputEl.value
                })

                if (guessAnswer.toLowerCase() === flagLetters.replaceAll(' ', '').replaceAll('-','').toLowerCase()) {
                    console.log('correct answer')
                    setIsCorrect(true)
                    currentInput.blur()
                    handleCorrectAnswer(flagLetters)
                } else {
                    handleIncorrectAnswer()
                    setIsCorrect(false)
                    console.log(isCorrect)
                }
                
            }

            if (nextInputIndex > 0 && nextInputIndex < letterInputs.length) {
                console.log('next focus')
                nextInput.focus()
            }
        }
    }, [flagLetters])

    function resetInputs() {
        setIsCorrect(null)
        console.log('reset all inputs')

        let allInputs:HTMLCollection = document.getElementsByClassName('letter-inputs')
        Array.from(allInputs).forEach( (element:any, index) => {
            element.value = ''
        })

        // console.log(firstInput)
        let firstInput = allInputs[0] as HTMLInputElement
        // console.log('FIRST INPUT', firstInput)
        firstInput?.focus()
        firstInput?.click()
    }

    function handleOnSkip() {
        setSkipFlag(true)
        handleSkip()
    }

    useEffect(() => {
        console.log('use effect')
        setSkipFlag(false)
        let letterOrder = 0
        setGuessLetters(() => {
            return flagLetters.split('').map( (letter, index) => {

                let letterInput

                if (letter === '-' || letter === ' ') {
                    letterInput = {
                        value: letter,
                        order: null
                    }
                } else {
                    letterInput = {
                        value: letter,
                        order: letterOrder
                    }

                    letterOrder += 1
                }

                return letterInput
            })
        })
    
    }, [flagLetters])


    useEffect(() => {
        console.log('guess letter change')
        resetInputs()
    
    //   return () => {
    //     resetInputs()
    //   }
    }, [guessLetters])
    

    return (
        <>
            {
                guessLetters.map( (letter, index) => {
                    return (
                        letter.value === '-' || letter.value === ' '
                        ? <span key={index} className="mx-2 block">{letter.value}</span>
                        : <input key={index} type="text" maxLength={1} data-order={letter.order} className={`${!isCorrect && isCorrect !== null ? 'border-red-500' : ''} ${isCorrect && isCorrect !== null ? 'border-green-500' : ''} letter-inputs border-2 w-8 text-2xl text-center mx-1 my-1 rounded-md dark:text-black`} onKeyUp={handleOnChange}/>
                        
                    )
                })
            }
            {
                !skipFlag && <div className="flex justify-center mt-4">
                    <button className="border-2 rounded-md py-2 px-4 bg-red-400 text-white hover:bg-red-500" onClick={handleOnSkip} >SKIP</button>
                </div>
            }
            
        </>
    )
}

export default GameGuessLetters