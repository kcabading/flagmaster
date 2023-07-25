import { useState } from "react"

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from "@/components/ui/label"

type quizOptionsProps = {
    setNoOfFlags: (noOfFlags: string) => void,
    setLevel: (level: string) => void,
}


const QuizOptions = function (props: quizOptionsProps) {

    let noOfFlags = [10, 20, 30]

    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="noOfFlags"  className="my-1">How many flags:</label>
                <RadioGroup className='flex' onValueChange={props.setNoOfFlags}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10" id="option-one" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-one">10</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="20" id="option-two" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-two">20</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30" id="option-two" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-two">30</Label>
                    </div>
                </RadioGroup>
                {/* <div className="flex">
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
                </div> */}
                
                {/* <input type="number" name="noOfFlags" className="dark:text-black border-2 border-black" onChange={props.setNoOfFlags}/> */}
                <label className="my-1">Difficulty</label>
                <RadioGroup className='flex' onValueChange={props.setLevel}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Easy" id="option-one" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-one">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Medium" id="option-two" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-two">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Hard" id="option-two" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-two">Hard</Label>
                    </div>
                </RadioGroup>
                {/* <select name="difficulty" id="difficulty" className="dark:text-black border-2 border-slate-300" onChange={(e) => props.setLevel(e.target.value)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select> */}
            </div>
        </>
    )
}

export default QuizOptions