import { useState } from "react"

type quizOptionsProps = {
    setNoOfFlags: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const QuizOptions = function (props: quizOptionsProps) {

    return (
        <>
            <div className="flex flex-col">
                <p className="text-center font-bold">Try it Now!</p>
                <label htmlFor="noOfFlags">How many flags:</label>
                <input type="number" name="noOfFlags" className="dark:text-black border-2 border-black" onChange={props.setNoOfFlags}/>
                <label>Select you difficulty</label>
                <select name="difficulty" id="difficulty" className="dark:text-black border-2 border-black">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
        </>
    )
}

export default QuizOptions