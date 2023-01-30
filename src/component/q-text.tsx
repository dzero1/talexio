import React, { useState } from "react";

type ChildProps = {
  question?:any,
  onUpdate?:(val: string) => void
};

const QuizTypeText: React.FC<ChildProps> = ({
    onUpdate=()=>{},
  question = undefined
}) => {
  
  const [answer, setAnswer] = useState('');
  const handleClick = () => {
    onUpdate(answer);
  }

  return (
    <div className="">
        <div className="text-3xl font-extrabold mb-6">{question.title}</div>

        <input type="text" id="name" value={answer} onChange={(event) => setAnswer(event.target.value)}
            className="w-72 p-2 mx-auto my-0 mb-5 rounded-md border border-violet-700 focus:border-violet-800"
            min={question.validation.min} max={question.validation.max} placeholder={question.placeholder} />

        <div className="mt-3">
            <button onClick={() => handleClick()} 
            className="mt-3 bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg text-xl px-8 py-2">Submit</button>
        </div>
    </div>);
}

export default QuizTypeText;
