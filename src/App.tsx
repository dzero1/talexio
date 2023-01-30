import { getPackedSettings } from 'http2';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Intro from './page/intro';
import Outro from './page/outro';
import Quiz from './page/quiz';
import Report from './page/report';

const App = () => {
  
  let questions = useRef([
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
          title: <span>Car <span className='text-violet-700'>model</span></span>,
        },
      ]
    },
  ]);
  const [name, setName] = useState<any>();

  // Init app data
  const startApp = (name:string) => {
    setName(name);
    setPage("quiz");
  }

  const showReport = () => {
    setPage('report');
  }

  const [response, setResponse] = useState<any>();
  useEffect(() => {
    if (response) setPage('exit');
  }, [response]);

  const handleExit = (_response:string) => {
    console.log("handleExit", _response);
    setResponse(_response);
    setPage('exit');
  }

  const restart = () => {
    setResponse(undefined);
    setPage('');
  }

  const [page, setPage] = useState<string>();
  const [pageElement, setPageElement] = useState<any>(<></>);

  useEffect(()=>{
    let elem:any = <></>;
    switch (page) {
      case "quiz":
        elem = <Quiz questions={questions.current} data={{"name": name}} onExit={(_response:any) => handleExit(_response)} onRestart={() => restart()}></Quiz>;
        break;
      case "exit":
        elem = <Outro onRestart={() => restart()}>{response}</Outro>;
        break;
      case "report":
        elem = <Report></Report>;
        break;
      default:
        elem = <Intro onStart={ (name:string) => startApp(name) } onShowReport={ () => showReport() } />;
        break;
    }
    setPageElement(elem)
  }, [page, name]);

  return (
    <div className="App">
      {pageElement}
    </div>
  );
}

export default App;
