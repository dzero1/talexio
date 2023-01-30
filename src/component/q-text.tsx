import React, { useEffect, useState } from "react";

type ChildProps = {
  question?:any,
  onUpdate?:(val: string) => void
};

const QuizTypeText: React.FC<ChildProps> = ({
    onUpdate=()=>{},
  question = undefined
}) => {

  const [error, setError] = useState<any>();
  const [answer, setAnswer] = useState('');

  const handleValueChange = (value:any) => {
    setError(undefined);
    if (question.validation && value){
      if (question.validation.min && value <= question.validation.min){
        setError(`You can't reach below ${question.validation.min}`);
        setAnswer(question.validation.min);
        return;
      }
      if (question.validation.max && value >= question.validation.max) {
        setError(`You can't go beyond ${question.validation.max}`);
        setAnswer(question.validation.max);
        return;
      }
    } 
    setAnswer(value);
  }

  useEffect(()=>{
    console.log("handleValueChange answer:", answer);
    onUpdate(answer);
	}, [answer])

  if (!question.validation) question.validation = {};

  return (
    <div className="mb-6">
        <div className="text-3xl font-extrabold mb-6">{question.title}</div>

        <input type={question.type} id="name" value={answer} onChange ={(event) => handleValueChange(event.target.value)}
            className="w-72 p-2 mx-auto my-0 mb-5 rounded-md border border-violet-700 focus:border-violet-800"
            min={question.validation.min ?? 0} max={question.validation.max ?? 99999} placeholder={question.placeholder} autoComplete="off" />

        <p className="text-red-500">{error}</p>
    </div>);
}

export default QuizTypeText;
