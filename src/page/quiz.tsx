import React, { useEffect, useRef, useState } from "react";
import QuizTypeDropdown from "../component/q-dropdown";
import QuizTypeRadio from "../component/q-radio";
import QuizTypeText from "../component/q-text";

type ChildProps = {
  questions?:Array<any>,
  name?:string,
  onExit?:(val: string) => void
  onRestart?:() => void
};

let multiAnswer = {};

const Quiz: React.FC<ChildProps> = ({
  onExit=()=>{},
  onRestart=()=>{},
  questions = [],
  name = '',
}) => {
  const userIdRef = useRef(new Date().getTime());
  const [surveyData, setSurveyData] = useState<any>({});
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [quiz, setQuizElement] = useState<any>(<></>);
  const [repeating_quiz, setRepeatingElement] = useState<any>(<></>);
  const [answer, setAnswer] = useState('');
  // const [multiAnswer, setMultiAnswer] = useState<object>({});

  // Set storage
  useEffect(() => {
    const _obj:any = JSON.parse(localStorage.getItem('talexio') ?? "{}");
    _obj[userIdRef.current] = surveyData;
    localStorage.setItem('talexio', JSON.stringify(_obj));
  }, [surveyData]);

  // read storage
  useEffect(() => {
    const _obj:any = JSON.parse(localStorage.getItem('talexio') ?? '{}');
    if (_obj[userIdRef.current]){
      if (!_obj[userIdRef.current]['name']) _obj[userIdRef.current]['name'] = name;
      setSurveyData(_obj[userIdRef.current]);
    }
    setCurrentQuestionIndex(0)
  }, []);
  
  // Update question index
  useEffect(() => {
    console.log(`currentQuestionIndex: ${currentQuestionIndex}`);
    setCurrentQuestion(questions[currentQuestionIndex])
  }, [currentQuestionIndex]);

  // Update question
  useEffect(() => {
    // Check asking conditions
    if (currentQuestion){
      if (currentQuestion.askConditions){
        console.log(`currentQuestion: ${currentQuestion}`);
        let successCount = 0;
        // Check each condition is valid
        currentQuestion.askConditions.forEach((condition:any) => {
          let conditionSuccess:boolean = false;
          switch (condition.operator) {
            case "=":
            case "==":
              conditionSuccess = surveyData[condition.key] == condition.value;
              break;
            case "!=":
            case "<>":
              conditionSuccess = surveyData[condition.key] != condition.value;
              break;
            case "<":
              conditionSuccess = surveyData[condition.key] < condition.value;
              break;
            case ">":
              conditionSuccess = surveyData[condition.key] > condition.value;
              break;
          }
  
          // if success update success count
          if (conditionSuccess) successCount++;
        });

        // if all the conditions are not satisfied, we can skip it
        if (successCount != currentQuestion.askConditions.length){
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }
      setQuizElement(getQuestionElement(currentQuestion, setAnswer ));
    }
  }, [currentQuestion]);
  
  useEffect(()=>{
    if (currentQuestion && currentQuestion.repeating) updateRepeatView()
	}, [answer])

  useEffect(()=>{
    console.log('multiAnswer:', multiAnswer);
	}, [multiAnswer])
  
  // Store answer and render next question
  const handleAnswer = (answer: any) => {
    console.log(answer);
    let _item:any = Object.assign({}, surveyData);
    _item[currentQuestion.key] = answer;
    setSurveyData(_item);

    let nextQidx = currentQuestionIndex+1;

    // Check exit conditions
    if (currentQuestion.exitConditions){
      let successCount = 0;
      // Check each condition is valid
      currentQuestion.exitConditions.forEach((condition:any) => {
        let conditionSuccess:boolean = false;
        switch (condition.operator) {
          case "=":
          case "==":
            conditionSuccess = _item[condition.key] == condition.value;
            break;
          case "!=":
          case "<>":
            conditionSuccess = _item[condition.key] != condition.value;
            break;
          case "<":
            conditionSuccess = _item[condition.key] < condition.value;
            break;
          case ">":
            conditionSuccess = _item[condition.key] > condition.value;
            break;
        }

        // if success update success count
        if (conditionSuccess) successCount++;
      });

      // if all the conditions are satisfied, we can exit now
      if (successCount === currentQuestion.exitConditions.length){
        onExit(currentQuestion.response ?? '');
        return;
      }
    }

    if (nextQidx === questions.length){
      onExit(currentQuestion.response ?? '');
      return;
    } else {
      setCurrentQuestionIndex(nextQidx);
    }
  }

  const getQuestionElement = (_question:any, callback?:Function) => {
    let quiz;
    switch (_question.type) {
      case "text":
      case "number":
        quiz = <QuizTypeText question={_question} onUpdate={(value) => callback!(value)} />
        break;
      case "dropdown":
        quiz =  <QuizTypeDropdown question={_question} onUpdate={(value) => callback!(value)} />
        break;
      case "radio":
        quiz = <QuizTypeRadio question={_question} onUpdate={(value) => callback!(value)} />
        break;
      default:
        break;
    }
    return quiz;
  }
  
  const handleSubmit = () => {
    if (currentQuestion && currentQuestion.repeating){
      handleAnswer(multiAnswer);
    } else {
      handleAnswer(answer);
    }
  }

  const setMultipleAnswerValue = (key:string, value:any) => {
    let _answer:any = Object.assign({}, multiAnswer);
    _answer[key] = value;
    multiAnswer = _answer;
    console.log(key, value, multiAnswer);
  }

  const updateRepeatView = () => {
    let elems = <div className="w-2/4 mx-auto my-0" key={`${currentQuestion.key}`}>
      {[...Array(Number(answer))].map((x, i:number) =>
        <div key={`${currentQuestion.key}_${i}`} className="flex">
        {
          currentQuestion && currentQuestion.repeating.map((e:any, j:number) =>
            <div key={`${currentQuestion.key}_${i}_${j}`} className="flex-auto">
              {getQuestionElement(e, (value:any) => setMultipleAnswerValue(`${currentQuestion.key}_${i}_${j}`, value))}
            </div>
          )
        }
        </div>
      )}
      </div>
    setRepeatingElement(elems);
  }

  return (
    <div className="quiz-page">
      <div className='flex items-start justify-start'>
        <div className='w-full p-10 mx-auto my-0 items-start justify-start text-left cursor-pointer' onClick={()=>onRestart()}>
          <h1 className='text-5xl font-extrabold'>Talexio</h1>
          <h1 className='text-2xl font-extrabold text-left'>Quick <span className='text-violet-700'>Survey</span></h1>
        </div>
      </div>
      <div className='flex'>
        <div className='flex-auto p-6 items-center justify-center'>
          {quiz}
          {repeating_quiz}
          <div className="mt-3">
              <button onClick={() => handleSubmit()} 
              className="mt-3 bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg text-xl px-8 py-2">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
