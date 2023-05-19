import { useState } from "react"

type quizOptionsProps = {
    setNoOfFlags: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const QuizOptions = function (props: quizOptionsProps) {

    return (
        <>
            <p>Quiz Options</p>
            <label htmlFor="noOfFlags">How many flags:</label>
            <input type="number" name="noOfFlags" className="dark:text-black border-2 border-black" onChange={props.setNoOfFlags}/>
        </>
    )
}

export default QuizOptions