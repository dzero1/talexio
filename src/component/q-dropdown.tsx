import React, { useEffect, useState } from "react";

type ChildProps = {
  question?:any,
  onUpdate?:(val: string) => void
};

const QuizTypeDropdown: React.FC<ChildProps> = ({
  onUpdate=()=>{},
  question = undefined
}) => {
  const [answer, setAnswer] = useState('');
  const handleValueChange = (value:any) => {
    console.log("handleValueChange:", value);
    setAnswer(value);
  }

  useEffect(()=>{
    console.log("handleValueChange answer:", answer);
    onUpdate(answer);
	}, [answer])
  
  return (
    <div className="mb-6">
      <div className="text-3xl font-extrabold mb-6">{question.title}</div>
      {
        question.answers.forEach((elem:string) => {
          <span>{elem}</span>
        })
      }
      <select value={answer} onChange={(event) => handleValueChange(event.target.value)}
        className="w-72 p-2 mx-auto my-0 mb-5 rounded-md border border-violet-700">
          <option disabled value=""> -- Select --</option>
          {
            question.answers.map((elem:any) => <option key={elem.label ? elem.label : elem} value={elem.label ? elem.label : elem}>{elem.label ? elem.label : elem}</option> )
          }
      </select>
    </div>);
}

export default QuizTypeDropdown;
