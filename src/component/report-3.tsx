import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },/* 
    title: {
      display: true,
      text: 'Respondent group by percentage',
    }, */
  },
};

export function Report3() {
  let labels:Array<number> = [];
  let chartData:Array<any> = [];
  let tableData:Array<any> = [];

  const survey:any = JSON.parse(localStorage.getItem('talexio') ?? "{}");

  Object.keys(survey).forEach((k:any) => {
    const e = survey[k];
    if (e.age && e.drivetrain && Number(e.age.trim()) >= 18 && e.drivetrain.trim() != "RWD"){
      labels.push(Number(e.age.trim()));
    }
  });
  labels = Array.from(new Set(labels));
  labels.sort(); 

  Object.keys(survey).forEach((k:any) => { 
    const e = survey[k];
    if (e.age && e.drivetrain && Number(e.age.trim()) >= 18 && e.drivetrain.trim() != "RWD"){
      const idx = labels.indexOf(Number(e.age.trim()))
      if (!chartData[idx]) chartData[idx] = 0;
      chartData[idx]++;
      tableData.push(e);
    }
  });

  console.log(labels);
  console.log(chartData);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <>
        <div className="mt-5 bg-white shadow-sm rounded-md p-4 text-left">
            <p className="text-xl font-bold mb-5">Targetables that picked FWD or “I don't know”</p>
            <div className="w-2/4 my-0 mx-auto">
                <Bar options={options} data={data} />
            </div>
        </div>
        <div className="mt-5 bg-white shadow-sm rounded-md p-4 text-left">
            <p className="text-xl font-bold mb-5">Details</p>
            <div className="w-9/12 my-0 mx-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        tableData.map(e => <tr>
                          <td>{e.name}</td>
                          <td>{e.age}</td>
                          <td>{e.gender}</td>
                        </tr>) 
                      }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
