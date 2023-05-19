
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
        <div className='finish-quiz flex flex-col place-content-center items-center'>
            <h1 className='font-bold text-4xl'>Congratulations!!!</h1>
            <p>You've got <span>{correctAnswer}/{noOfFlags}</span> correct answer!</p>
            <p>Time taken: {timer}</p>
            <button onClick={ () => handleReset() } className='border-2 p-2 rounded-md hover:bg-blue-100'>RESET</button>
            <div>
              <table className='table-fixed border-collapse border-2 border-slate-500'>
              <caption className="caption-top">
                Result History
              </caption>
                <thead>
                  <tr>
                    <th>Answers</th>
                    <th>Correct Answers</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    answerHistory?.map( (history, index) => {
                      return (
                        <tr key={index} className={history.answer === history.correct ? 'bg-green-500' : 'bg-red-500'}>
                          <td>{history.answer}</td>
                          <td>{history.correct}</td>
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