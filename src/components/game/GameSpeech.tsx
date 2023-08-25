'use client'

import useSpeechRecognition from '@/hooks/useSpeechRecognition'
import { Check, InfoIcon, Mic, RotateCcw } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface IGimme5Props {
    answers: string[],
    handleCorrectAnswer: () => void,
    powerUps: string[]
}

const enum SpeechStatus {
    ON,
    OFF,
    PLAYING
}

type TGimmeSpeechProps = {
    flag: string,
    handleGuessFlag: (option: string) => void,
    powerUps: string[]
}

const nextWordText = ['next', 'pass']


const GameSpeech = ({flag, handleGuessFlag}: TGimmeSpeechProps ) => {
    const [speechCount, setSpeechCount] = useState(0)
    const [speechStatusText, setSpeechStatusText] = useState('Start Talking')
    const [speechStatus, setSpeechStatus] = useState(SpeechStatus.ON)
    const [speechText, setSpeechText] = useState('')
    const [isCorrect, setIsCorrect] = useState<boolean>()

    const { recognition } = useSpeechRecognition()

    console.log('RENDER', flag)
    
    function handleSpeechReceive(speechText: string) {

        let correctFlag = flag.toLowerCase()    
        let guessedCountry = speechText.trim()

        if ( guessedCountry == correctFlag || guessedCountry.search(correctFlag) !== -1 ) {
            console.log('CORRECT ANSWER!', flag)
            setIsCorrect(true)
            handleGuessFlag(flag)
        } if (nextWordText.includes(guessedCountry)) {
            console.log('Incorrect Answer 1!')
            handleGuessFlag('incorrect')
            setIsCorrect(false)
            recognition.stop()
        } else {
            console.log('Incorrect Answer 2!')
            setIsCorrect(false)
            recognition.stop()
        }

        setSpeechCount( prev => prev + 1)
        setSpeechText(guessedCountry)
        window.setTimeout( () => setSpeechText('...'), 2000)
    }

    function resetSpeech() {
        recognition.stop()
        recognition.start()
    }

    recognition.onspeechstart = function(event:any){
        console.log('speech start')
        setSpeechStatus(SpeechStatus.PLAYING)
        setSpeechText('...')
        setSpeechStatusText('Listening...')
    }

    const onResetButton = () => {
        setSpeechText('...')
        setSpeechStatus(SpeechStatus.ON)
        recognition.start()
    }

    recognition.onerror = function(event:any) {
        console.log('error', event)
        // setSpeechStatus(SpeechStatus.OFF)
        // setSpeechStatusText('Voice Recognition Error. Please reset')
        // resetSpeech()
        // recognition.start()
    }

    recognition.onnomatch = function(event:any) {
        console.log('no match')
        resetSpeech()
    }

    // @ts-ignore
    recognition.onresult = function(event) {
        console.log(event.results)
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        let speechText = event.results[0][0].transcript;
        // diagnostic.textContent = 'Result received: ' + color + '.';
        // bg.style.backgroundColor = color;
        
        // console.log('Confidence: ' + event.results[0][0].confidence);

        handleSpeechReceive(speechText)
    }

    function getSpeechColor():string {
        switch (speechStatus) {
            case SpeechStatus.ON:
                return 'green';
            case SpeechStatus.OFF:
                return 'red';
            case SpeechStatus.PLAYING:
                return 'yellow';
            default:
                return 'gray'
        }
    }

    useEffect(() => {
        recognition.start()
        
        return () => recognition.stop()
    }, [flag, speechCount])

    return (
        <div>
            <div className='text-center mb-3'>
                <div className="border rounded-md w-full mb-5">
                    <p className='text-sm p-2'><InfoIcon className='inline'/> &nbsp;Speak clearly and at a moderate pace. Enunciate your words to help the speech recognition system understand you accurately. Also ry to minimize background noise as much as possible. Background noise can interfere with the accuracy of the speech recognition. Click on <span className='font-bold'>Reset</span> button if speech recognition for some reason does not recognize your voice. You can say <span className='font-bold'>&quot;Pass&quot; or &quot;Next&quot;</span> to skip to the next flag</p>
                </div>
                <p>
                    <Mic color={getSpeechColor()} className='t animate-pulse inline'/>
                    {speechStatusText} &nbsp;
                    <button className='text-xs rounded-md px-2 py-1 bg-slate-300 border' onClick={onResetButton}>
                        <RotateCcw className='inline' size={20} />&nbsp;Reset 
                    </button>
                </p>
                
                <h2 className={`${isCorrect && 'text-green-700'} text-2xl font-bold`}>Speech Text: &nbsp;{speechText}
                &nbsp; {isCorrect && <Check className='inline' />}</h2>
            </div>
        </div>
    )
}

export default GameSpeech