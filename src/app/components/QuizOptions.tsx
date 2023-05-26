import { RadioGroup } from "@headlessui/react"
import { useState } from "react"

type quizOptionsProps = {
    setNoOfFlags: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setLevel: (level: string) => void,
}


const QuizOptions = function (props: quizOptionsProps) {

    let noOfFlags = [10, 20, 30]

    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="noOfFlags"  className="my-1">How many flags:</label>
                <div className="flex">
                    {
                        noOfFlags.map( (number, index) => {
                            return (
                                <div key={index} className="flex items-center mr-4">
                                    <input id="inline-radio" type="radio" value={number} name="inline-radio-group" className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={props.setNoOfFlags}/>
                                    <label htmlFor="inline-radio" className="ml-2 text-gray-900 dark:text-gray-300">{number}</label>
                                </div>
                            )
                        })
                    }
                </div>
                
                {/* <input type="number" name="noOfFlags" className="dark:text-black border-2 border-black" onChange={props.setNoOfFlags}/> */}
                <label className="my-1">Difficulty</label>
                <select name="difficulty" id="difficulty" className="dark:text-black border-2 border-slate-300" onChange={(e) => props.setLevel(e.target.value)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
        </>
    )
}

export default QuizOptions