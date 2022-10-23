import { useCallback, useState, useRef, useEffect } from "react"

function App() {
  const [countAnswered, setCountAnswered] = useState(1)
  const [countCorrected, setCountCorrected] = useState(0)
  const [answers, setAnswers] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState("")
  const colorPreviewer = useRef()
  const answerA = useRef()
  const answerB = useRef()
  const answerC = useRef()
  const answerD = useRef()
  

  function disableButtons (buttons) {
    buttons.forEach(button=> {
      button.disabled = true
    })
  }
  function enableButtons (buttons) {
    buttons.forEach(button=> {
      button.disabled = false
    })
  }
  const createRandomColor = useCallback(() => {
    const randomColor = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
    return randomColor
  }, [])

  const createQuestion = useCallback(() => {
    const answers = new Set()
    while (answers.size < 4) {
      answers.add(createRandomColor())
    }
    const correctAnswer = [...answers][Math.floor(Math.random() * 4)]
    return {
      answers: [...answers],
      correctAnswer,
    }
  }, [createRandomColor])

  const handlePickAnswer = (e) => {
    if(e.target.textContent === correctAnswer) {
      setCountCorrected(count=>count+1)
    }

    const ans = [answerA.current,answerB.current,answerC.current,answerD.current]
    disableButtons(ans)
    answers.forEach((answer, index) => {
      if (answer === correctAnswer) {
        ans[index].style.backgroundColor = "#22cc22"
      
      } else {
        ans[index].style.backgroundColor = "#cc2222"
      }
    })

    setTimeout(() => {
      ans.forEach((answer) => {
        answer.style.backgroundColor = "transparent"
      })
      setCountAnswered((count) => count + 1)
    }, 1000)
  }

  useEffect(() => {
    const ans = [answerA.current,answerB.current,answerC.current,answerD.current]
    enableButtons(ans)
    const { answers, correctAnswer } = createQuestion()
    colorPreviewer.current.style.backgroundColor = `#${correctAnswer}`
    setAnswers(answers)
    setCorrectAnswer(correctAnswer)

    return
  }, [countAnswered, createQuestion])

  return (
    <div className="flex flex-col items-center justify-center mt-40 mx-20 border-[1px] rounded-lg relative">
      <h1 className="mt-10 font-semibold text-3xl">Đoán mã Hex của màu dưới đây</h1>
      <div
        className="w-full mt-10 aspect-video max-w-lg max-h-md rounded-md"
        ref={colorPreviewer}
      ></div>
      <div className="flex flex-wrap w-full py-10 max-w-lg">
        <div className="flex justify-start basis-1/2">
          <button
            className="px-4 py-2 rounded-md border-[2px] min-w-[6rem] max-w-[400px] mb-6 hover:opacity-80 hover:bg-orange-400"
            onClick={handlePickAnswer}
            ref={answerA}
          >
            {answers[0]}
          </button>
        </div>
        <div className="flex justify-end basis-1/2">
          <button
            className="px-4 py-2 rounded-md border-[2px] min-w-[6rem] max-w-[400px] mb-6 hover:opacity-80 hover:bg-orange-400"
            onClick={handlePickAnswer}
            ref={answerB}
          >
            {answers[1]}
          </button>
        </div>
        <div className="flex justify-start basis-1/2">
          <button
            className="px-4 py-2 rounded-md border-[2px] min-w-[6rem] max-w-[400px] mb-6 hover:opacity-80 hover:bg-orange-400"
            onClick={handlePickAnswer}
            ref={answerC}
          >
            {answers[2]}
          </button>
        </div>
        <div className="flex justify-end basis-1/2">
          <button
            className="px-4 py-2 rounded-md border-[2px] min-w-[6rem] max-w-[400px] mb-6 hover:opacity-80 hover:bg-orange-400"
            onClick={handlePickAnswer}
            ref={answerD}
          >
            {answers[3]}
          </button>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        {countCorrected + "/" + countAnswered}
      </div>
    </div>
  )
}

export default App
