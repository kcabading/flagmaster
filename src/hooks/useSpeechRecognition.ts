import { useRef } from "react"


type TRecognitionEvents = {
    flag: string,
    onResult: (speech: string) => void,
    onError: () => void,
    onReset: () => void,
    onSpeechStart: () => void,
    onSpeechEnd: () => void
}

const useSpeechRecognition = () => {
    // @ts-ignore
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    // @ts-ignore
    // let SpeechGrammarList = window.webkitSpeechGrammarList
    // // @ts-ignore
    // let SpeechRecognitionEvent = window.webkitSpeechRecognitionEvent

    // const countries = ['Australia', 'Fiji', 'Guam', 'Kiribati', 'Marshall Islands', 'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'];

    let recognition = new SpeechRecognition();
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

    // recognitionRef.current = recognition

    // recognitionRef.current = recognition

    // recognition.onspeechstart = function(event:any){
    //     console.log('speech start now')

    //     // onSpeechStart()
    //     // setSpeechStatus(SpeechStatus.PLAYING)
    //     // setSpeechText('...')
    //     // setSpeechStatusText('Listening...')
    // }

    // recognition.onresult = function (event: any) {
    //     // console.log(event.results)
    //     // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    //     // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    //     // It has a getter so it can be accessed like an array
    //     // The first [0] returns the SpeechRecognitionResult at the last position.
    //     // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    //     // These also have getters so they can be accessed like arrays.
    //     // The second [0] returns the SpeechRecognitionAlternative at position 0.
    //     // We then return the transcript property of the SpeechRecognitionAlternative object
    //     let speechText = event.results[0][0].transcript;
    //     // // diagnostic.textContent = 'Result received: ' + color + '.';
    //     // // bg.style.backgroundColor = color;
        
    //     // console.log('Confidence: ' + event.results[0][0].confidence);

    //     // console.log( 'Correct Answer: ', flag, flag.length)
    //     console.log('RESULT RECEIVED:', speechText,  speechText.length)
    //     console.log('FLAG !!', flag)

    //     onResult(speechText)
    //     speechRestart()
    // }

    // recognition.onspeechend = function (event:any) {
    //     onSpeechEnd()
    // }

    // recognition.onerror = function (event:any) {
    //     console.log('speech error')
    //     speechRestart()
    //     onError()
    // }

    // recognition.onnomatch = function (event:any) {
    //     console.log('speech no match')
    //     speechRestart()
    // }

    // const speechRestart = () => {
    //     recognition.stop()
    //     setTimeout(() => {
    //         recognition.start()
    //     }, 1000);

    //     onReset()
    // }
    
    // const speechStop = () => {
    //     recognition.stop()
    // }

    return { recognition }

}

export default useSpeechRecognition