import React, { useState } from "react";
import QuizTypeDropdown from "../component/q-dropdown";
import QuizTypeRadio from "../component/q-radio";
import QuizTypeText from "../component/q-text";

type ChildProps = {
  question?:any,
  onSubmit?:(val: string) => void
};

const Quiz: React.FC<ChildProps> = ({
  onSubmit=()=>{},
  question = undefined
}) => {

  const [currentRepeatIndex, setCurrentRepeatIndex] = useState<number>(0);

  const handleSubmit = (value:string) => {
    // check repeatable questions
    if (question.repeating){
      quiz = <>
        {
          question.repeating.map((e:any, i:number) => {
            e['key'] = `${question.key}_${currentRepeatIndex}_${i}`
            return getQuestionElement(e.type)
          })
        }
      </>
    } else {
      onSubmit(value);
    }
  }
  
  const getQuestionElement = (type:string) => {
    let quiz;
    switch (type) {
      case "text":
      case "number":
        quiz =  <QuizTypeText question={question} onUpdate={(value) => handleSubmit(value)} />
        break;
      case "dropdown":
        quiz =  <QuizTypeDropdown question={question} onUpdate={(value) => handleSubmit(value)} />
        break;
      case "radio":
        quiz = <QuizTypeRadio question={question} onUpdate={(value) => handleSubmit(value)} />
        break;
      default:
        break;
    }
    return quiz;
  }

  let quiz = getQuestionElement(question.type);

  return (
    <div className="quiz-page">
      <div className='flex items-start justify-start'>
        <div className='w-full p-10 mx-auto my-0 items-start justify-start text-left'>
          <h1 className='text-5xl font-extrabold'>Talexio</h1>
          <h1 className='text-2xl font-extrabold text-left'>Quick <span className='text-violet-700'>Survey</span></h1>
        </div>
      </div>
      <div className='flex'>
        <div className='flex-auto p-6 items-center justify-center'>
          {quiz}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
