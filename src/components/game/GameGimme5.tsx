import React, { useRef, useState } from 'react'

interface IGimme5Props {
    answers: string[],
    handleCorrectAnswer: () => void,
    powerUps: string[]
}

let possibleAnswers = ['Spain', 'Singapore', 'Sweden', 'Somalia', 'Suriname']


const GameGimme5 = () => {

    const [guessAnswers, setGuessAnswers] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    function handleGuessAnswer(event: React.ChangeEvent<HTMLInputElement>) {

        let answer = event.target.value
        if (possibleAnswers.includes(answer)) {
            if (inputRef.current !== null) {
                inputRef.current.value = ''
            }
            setGuessAnswers( (prev) => {
                return [
                    ...prev,
                    answer
                ]
            })
        }
    }

    return (
        <div>
            <div className='text-center mb-3'>
                <p>Give 5 countries that starts with letter S</p>
            </div>
            <div className='text-center m-auto mb-5'>
                <input type="text" className='w-[200px] py-1 px-2 rounded border' onChange={handleGuessAnswer} ref={inputRef} />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                {
                    possibleAnswers.map( (answer, index) => {
                        return (
                            <div key={index} className='px-2 py-1 rounded w-[300px] bg-amber-50 text-center text-lg'>
                                <p>{ guessAnswers.includes(answer) ? answer : '-'}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GameGimme5