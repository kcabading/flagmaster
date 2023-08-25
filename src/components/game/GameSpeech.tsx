import { Check, InfoIcon, Mic, RotateCcw } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { setTimeout } from 'timers/promises'
import { Button } from '../ui/button'

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

// @ts-ignore
let SpeechRecognition = window.webkitSpeechRecognition
// @ts-ignore
let SpeechGrammarList = window.webkitSpeechGrammarList
// @ts-ignore
let SpeechRecognitionEvent = window.webkitSpeechRecognitionEvent

// const countries = ['Australia', 'Fiji', 'Guam', 'Kiribati', 'Marshall Islands', 'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'];

const recognition = new SpeechRecognition();
// if (SpeechGrammarList) {
//   // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
//   // This code is provided as a demonstration of possible capability. You may choose not to use it.
//   var speechRecognitionList = new SpeechGrammarList();
//   var grammar = '#JSGF V1.0; grammar countries; public <country> = ' + countries.join(' | ') + ' ;'
//   speechRecognitionList.addFromString(grammar, 1);
//   recognition.grammars = speechRecognitionList;
// }
recognition.continuous = false;
recognition.lang = 'en-us'; // en-us or fil
recognition.interimResults = false;
recognition.maxAlternatives = 3;


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

    recognition.onspeechstart = function(event:any){
        console.log('speech start')
        setSpeechStatus(SpeechStatus.PLAYING)
        setSpeechText('...')
        setSpeechStatusText('Listening...')
    }

    recognition.onspeechend = function (event:any) {
        setSpeechStatus(SpeechStatus.ON)
    }

    const resetSpeech = () => {
        console.log('speech reset')
        recognition.stop()
        setSpeechStatusText('Start Talking...')
        window.setTimeout( () => {
            recognition.start()
            setIsCorrect(false)
        }, 1000)
    }

    const onResetButton = () => {
        setSpeechText('...')
        resetSpeech()
    }

    recognition.onerror = function(event:any) {
        console.log('error')
        setSpeechStatus(SpeechStatus.OFF)
    }

    recognition.onerror = function(event:any) {
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
        
        console.log('Confidence: ' + event.results[0][0].confidence);

        console.log( 'Correct Answer: ', flag, flag.length)
        console.log('RESULT RECEIVED:', speechText,  speechText.length)

        let correctFlag = flag.toLowerCase()
        let guessedCountry = speechText.trim()

        if ( guessedCountry == correctFlag || guessedCountry.search(correctFlag) !== -1 ) {
            console.log('CORRECT ANSWER')
            setIsCorrect(true)
            handleGuessFlag(flag)
        } if (nextWordText.includes(guessedCountry)) {
            handleGuessFlag('incorrect')
        } else {
            // setIsCorrect(false)
            console.log('Incorrect Answer!')
        }
        setSpeechCount( prev => prev + 1)
        setSpeechText(guessedCountry)
        resetSpeech()
        // window.setTimeout( () => setSpeechText('...'), 2000)
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
        resetSpeech()
        return () => recognition.stop()
    }, [])

    return (
        <div>
            <div className='text-center mb-3'>
                <div className="border rounded-md w-full mb-5">
                    <p className='text-sm p-2'><InfoIcon className='inline'/> &nbsp;Speak clearly and at a moderate pace. Enunciate your words to help the speech recognition system understand you accurately. Also ry to minimize background noise as much as possible. Background noise can interfere with the accuracy of the speech recognition. Click on Reset button if speech recognition for some reason does not recognize your voice</p>
                </div>
                <p>
                    <Mic color={getSpeechColor()} className='t animate-pulse inline'/>
                    {speechStatusText} &nbsp;
                    <button className='text-xs rounded-md px-2 py-1 bg-slate-300 border' onClick={resetSpeech}>
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