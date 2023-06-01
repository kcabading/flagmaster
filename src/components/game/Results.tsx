
import convertTimeToNumber from "@/utils/convertTimetoNumber"

import { useRouter, usePathname } from "next/navigation"

type AnswerRow = {
    answer: string,
    correct: string
}

type ResultsProps = {
    correctAnswer: number,
    noOfFlags: number,
    timer: string,
    initialTime: number,
    handleReset: () => void,
    answerHistory: AnswerRow[]
}


const Results = function ( { correctAnswer, noOfFlags, timer, handleReset, answerHistory, initialTime }: ResultsProps ) {

  console.log('RESULTS RENDER')
    const pathnames = usePathname()
    const paths = pathnames.split('/')

    const router = useRouter()

    function handleNextChallenge() {
      // TODO: api for next challenge
      router.push(`play/challenges/${Number(paths[3]) + 1}`)
    }

    return (
        <div className="finish-quiz flex flex-col lg:flex-row place-content-center justify-around lg:w-3/4 max-lg:px-4">
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl mt-5">Congratulations!!!</h1>
              <p className="mt-4">You&apos;ve got <span className="font-bold text-xl">{correctAnswer}/{noOfFlags}</span> correct answer!</p>
              <p>Time taken: { initialTime > 0 ? initialTime - convertTimeToNumber(timer) : timer}</p>
              <div className="flex">
                <button onClick={ () => handleReset() } className="w-1/2 mt-4 border-2 border-slate-500 p-2 rounded-md hover:bg-green-500 mx-2">Try Again?</button>
                {paths[1] === 'play' && <button onClick={handleNextChallenge} className="w-1/2 mt-4 border-2 border-slate-500 p-2 rounded-md hover:bg-green-500 mx-2">Next Challenge</button>}
              </div>
            </div>
            
              <table className="w-full lg:w-1/3 table-fixed border-spacing-2 border-2 border-slate-500 mt-4 m-auto">
              <caption className="caption-top text-md">
                Results History
              </caption>
                <thead>
                  <tr>
                    <th className="border-2 border-slate-500 p-2">Answers</th>
                    <th className="border-2 border-slate-500 p-2">Correct Answers</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    answerHistory?.map( (history, index) => {

                      let rowClass = index % 2 ? "bg-slate-500" : "bg-slate-700"

                      return (
                        <tr key={index} className={history.answer === history.correct ? "bg-green-500" : "bg-red-500"}>
                          <td className="border-2 border-slate-500 p-2">{history.answer}</td>
                          <td className="border-2 border-slate-500 p-2">{history.correct}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            
        </div>
    )
}

export default Results