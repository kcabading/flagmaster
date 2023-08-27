import { useState } from "react"

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from "@/components/ui/label"

type quizOptionsProps = {
    setNoOfFlags: (noOfFlags: string) => void,
    setLevel: (level: string) => void,
    setMode: (mode: string) => void
}

const QuizOptions = function (props: quizOptionsProps) {
    
    return (
        <>
            <div className="flex flex-col max-sm:w-full max-sm:text-lg sm:text-md sm:px-5 max-sm:text-center space-y-2 mb-5">
                <label htmlFor="noOfFlags"  className="my-1">How many flags:</label>
                <RadioGroup className='flex max-sm:justify-center' onValueChange={props.setNoOfFlags}>
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
                <label className="my-1">Game Mode:</label>
                <RadioGroup className='flex max-sm:justify-center' onValueChange={props.setMode}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="multiple" id="option-one" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-one">Multiple</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fill" id="option-two" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-two">Fill</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="speech" id="option-three" />
                        <Label className="sm:text-sm text-xs" htmlFor="option-two">Speech</Label>
                    </div>
                </RadioGroup>
                <label className="my-1">Difficulty:</label>
                <RadioGroup className='flex max-sm:justify-center' onValueChange={props.setLevel}>
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
            </div>
        </>
    )
}

export default QuizOptions