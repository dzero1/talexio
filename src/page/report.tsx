import { Car, Question, GasPump, CirclesFour } from "phosphor-react";
import { useState } from "react";
import { Report1 } from "../component/report-1";
import { Report2 } from "../component/report-2";
import { Report3 } from "../component/report-3";
import { Report4 } from "../component/report-4";

type ChildProps = {
  onRestart?:() => void
};

let multiAnswer = {};

const Report: React.FC<ChildProps> = ({
  onRestart=()=>{},
}) => {

  const [report, setReport] = useState<any>('1');

  const getView = () => {
    switch (report) {
      case '2':
        return <Report2/>;
      case '3':
        return <Report3/>;
      case '4':
        return <Report4/>;
      case '1':
        return <Report1/>;
    }
  }

  const survey:any = JSON.parse(localStorage.getItem('talexio') ?? "{}");

  let info1 = 0;
  let info2 = 0;
  let info3 = 0;
  let info4 = 0;

  Object.keys(survey).forEach((k:any) => {
    const e = survey[k];
    
    // Under 18s participants
    if (e.age && Number(e.age.trim()) < 18){
      info1++;
    }

    // Unlicensed drivers
    if (e.age && e.license && e.license.trim() != 'Yes'){
      info2++;
    }

    // 18-25s first car owners
    if (e.age && Number(e.age.trim()) > 18 && Number(e.age.trim()) <= 25 && e.first_car && e.first_car.trim() == 'Yes'){
      info3++;
    }

    // Tragetable - over 18, have licenses and not the first car
    if (e.age && Number(e.age.trim()) > 18 && (e.license && e.license.trim() == 'Yes') && (e.first_car && e.first_car.trim() != 'Yes')){
      info4++;
    }
  });

  return (
    <div className="quiz-page bg-violet-100 w-screen h-full min-h-screen p-10 pl-20">
      <div className='flex items-start justify-start'>
        <div className='w-1/4 mx-auto my-0 items-start justify-start text-left'>
          <div className="cursor-pointer" onClick={()=>onRestart()}>
            <h1 className='text-7xl font-extrabold'>Talexio</h1>
            <h1 className='text-3xl font-extrabold text-left'>Quick <span className='text-violet-700'>Survey</span></h1>
          </div>
          <ul className="p-10">
            <li className={"mt-6 text-xl cursor-pointer " + (report == '1' ? 'font-bold' : '')}>
              <a onClick={()=>setReport('1')}>
                <CirclesFour className="inline mr-2" weight='fill' size={32}/> Report Dashboard
              </a>
            </li>
            <li className={"mt-6 text-xl cursor-pointer " + (report == '2' ? 'font-bold' : '')}>
              <a onClick={()=>setReport('2')}>
                <GasPump className="inline mr-2" size={32}/> Targetables that care about fuel emissions
              </a>
            </li>
            <li className={"mt-6 text-xl cursor-pointer " + (report == '3' ? 'font-bold' : '')}>
              <a onClick={()=>setReport('3')}>
                <Question className="inline mr-2" size={32}/> Targetables that picked FWD or “I don't know”
              </a>
            </li>
            <li className={"mt-6 text-xl cursor-pointer " + (report == '4' ? 'font-bold' : '')}>
              <a onClick={()=>setReport('4')}>
                <Car className="inline mr-2" size={32}/> The car make and model distribution
              </a>
            </li>
          </ul>
        </div>
        <div className='flex-auto p-6 items-center justify-center'>
          <div className='flex'>
            <div className='flex-auto text-left'>
              <p className="text-8xl font-extrabold">{info1}</p>
              <p className="text-2xl">Under 18s participants</p>
            </div>
            <div className='flex-auto text-left'>
              <p className="text-8xl font-extrabold">{info2}</p>
              <p className="text-2xl">Unlicensed drivers</p>
            </div>
            <div className='flex-auto text-left'>
              <p className="text-8xl font-extrabold">{info3}</p>
              <p className="text-2xl">18-25s first car owners</p>
            </div>
            <div className='flex-auto text-left'>
              <p className="text-8xl font-extrabold">{info4}</p>
              <p className="text-2xl">Targetable clients</p>
            </div>
          </div>
          {getView()}
        </div>
      </div>
    </div>
  );

}

export default Report;
