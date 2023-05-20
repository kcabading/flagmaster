
type AnswerRow = {
    answer: string,
    correct: string
}


type ResultsProps = {
    correctAnswer: number,
    noOfFlags: number,
    timer: string,
    handleReset: () => void,
    answerHistory: AnswerRow[]
}


const Results = function ( { correctAnswer, noOfFlags, timer, handleReset, answerHistory }: ResultsProps ) {
    return (
        <div className="finish-quiz flex flex-col place-content-center items-center max-lg:px-4">
            <h1 className="font-bold text-4xl">Congratulations!!!</h1>
            <p className="mt-4">You&apos;ve got <span>{correctAnswer}/{noOfFlags}</span> correct answer!</p>
            <p>Time taken: {timer}</p>
            <button onClick={ () => handleReset() } className="mt-4 border-2 border-slate-500 p-2 rounded-md hover:bg-green-500">Try Again?</button>
            <div>
              <table className="table-fixed border-spacing-2 border-2 border-slate-500 mt-4">
              <caption className="caption-top text-sm">
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
        </div>
    )
}

export default Results