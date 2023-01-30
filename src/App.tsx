import { getPackedSettings } from 'http2';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Intro from './page/intro';
import Outro from './page/outro';
import Quiz from './page/quiz';
import Report from './page/report';

const App = () => {
  
  let questions = [
    {
      key: "age",
      type: "number",
      validation: {
        min: 0,
        max: 100,
      },
      title: <span>Let's start with your <span className='text-violet-700'>Age</span>?</span>,
      placeholder: "Ex: 20",
    },
    {
      key: "gender",
      type: "dropdown",
      title: <span>What is you <span className='text-violet-700'>Gender</span>?</span>,
      answers: [
        'Male',
        'Female',
        'Other',
      ],
      exitConditions: [
        {
          key: "age",
          operator: "<",
          value: 18
        }
      ]
    },
    {
      key: "license",
      type: "radio",
      title: <span>Do you own a <span className='text-violet-700'>car driving license</span> ?</span>,
      answers: [
        'Yes',
        'No, I prefer using other transport',
      ],
      exitConditions: [
        {
          key: "license",
          operator: "=",
          value: 'No, I prefer using other transport'
        }
      ]
    },
    {
      askConditions: [
        {
          key: "age",
          operator: "<",
          value: 26
        }
      ],
      key: "first_car",
      type: "radio",
      title: <span>Is this your first <span className='text-violet-700'>car</span> ?</span>,
      answers: [
        'Yes',
        'No',
      ],
      response: "We are targeting more experienced clients, thank you for your interest",
      exitConditions: [
        {
          key: "first_car",
          operator: "=",
          value: 'Yes'
        }
      ]
    },
    {
      key: "drivetrain",
      type: "radio",
      title: <span>Which <span className='text-violet-700'>drivetrain</span> do you prefer?</span>,
      answers: [
        'FWD',
        'RWD',
        'I don\'t know',
      ]
    },
    {
      key: "fuel",
      type: "radio",
      title: <span>Are you worried about <span className='text-violet-700'>fuel</span> emissions?</span>,
      answers: [
        'Yes',
        'No',
      ]
    },
    {
      key: "car_count",
      type: "number",
      title: <span><span className='text-violet-700'>How many cars</span> do you have in your family?</span>,
      validation: {
        min: 0,
      },
      repeating:[
        {
          type: "dropdown",
          title: <span>Car <span className='text-violet-700'>make</span></span>,
          answers: [
            'BMW',
            'Chevrolet',
            'Honda',
            'Nissan',
            'Ford',
            'Fiat',
            'Volkswagen',
            'Volvo',
            'Jaguar',
            'Audi',
            'Toyota',
            'Lexus',
            'Porsche',
            'Bugatti',
            'Bentley',
            'Rolls Royce',
            'Tesla',
            'Mercedes- Benz',
          ]
        },
        {
          type: "text",
          title: <span>Car " + <span className='text-violet-700'>make</span></span>,
        },
      ]
    },
  ];

  const userIdRef = useRef(new Date().getTime());
  
  const [surveyData, setSurveyData] = useState<any>([]);
  const [key, getsurveyData] = useState([]);
  const [username, setName] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

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
      setSurveyData(_obj[userIdRef.current]);
    }
  }, []);
  
  // Update question index
  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex])
  }, [currentQuestionIndex]);

  // Update question
  useEffect(() => {
    // Check asking conditions
    if (currentQuestion && currentQuestion.askConditions){
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
  }, [currentQuestion]);
  
  // Init app data
  const startApp = (name:string) => {
    setSurveyData({"name": name});
    setName(name);
    setPage("quiz");
    startQuiz();
    console.log(name);
  }

  // Init quiz
  const startQuiz = () => {
    setCurrentQuestionIndex(0);
  }

  // Store answer and render next question
  const handleAnswer = (answer: string) => {
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
      if (successCount == currentQuestion.exitConditions.length){
        setPage('exit');
      }
    }

    if (nextQidx === questions.length){
      setPage("end");
    } else {
      setCurrentQuestionIndex(nextQidx);
    }
  }

  const showReport = () => {
    setTimeout(() => {
      setPage('report');
    }, 100);
  }

  const [page, setPage] = useState<string>("");
  const getPage = () =>{
    switch (page) {
      case "quiz":
        return <Quiz question={currentQuestion} onSubmit={(answer:string) => handleAnswer(answer)}></Quiz>;
      case "end":
      case "exit":
        return <Outro>{currentQuestion.response}</Outro>;
      case "report":
        return <Report></Report>;
      default:
        return <Intro onStart={ (name:string) => startApp(name) } onShowReport={ () => showReport() } />;
    }
  }

  return (
    <div className="App">
      {getPage()}
    </div>
  );
}

export default App;
