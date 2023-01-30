import React, { useState } from "react";

type ChildProps = {
  question?:any,
  onUpdate?:(val: string) => void
};

const QuizTypeRadio: React.FC<ChildProps> = ({
    onUpdate=()=>{},
  question = undefined
}) => {
  
  const [answer, setAnswer] = useState('');
  const handleClick = () => {
    onUpdate(answer);
  }

  return (
    <div className="w-2/4 mx-auto my-0">
      <div className=" text-3xl font-extrabold mb-6">{question.title}</div>

      <div className="w-fit mx-auto my-0">
      {
        question.answers.map((elem:string, i:number) => 
        <div key={"default-radio-" + i} className="flex items-center mb-4">
            <input id={"default-radio-" + i} type="radio" value={elem} name={question.key} onChange={(event) => setAnswer(event.target.value)}
              className="w-4 h-4 text-violet-600 focus:ring-violet-500" />
            <label htmlFor={"default-radio-" + i} className="ml-2 text-sm font-medium">{elem}</label>
        </div>
        )
      }
      </div>

      <div className="mt-3">
        <button onClick={() => handleClick()} 
          className="mt-3 bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg text-xl px-8 py-2">Submit</button>
      </div>
    </div>);
}

export default QuizTypeRadio;
