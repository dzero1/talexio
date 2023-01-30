import {
  Chart as ChartJS,
  Tooltip,
  Legend, 
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export function Report4() {
  let labels:Array<string> = [];
  let chartData:Array<any> = [];
  let tableData:Array<any> = [];
  let _chartData:any = {};

  let labels2:Array<string> = [];
  let chartData2:Array<any> = [];
  let _chartData2:any = {};

  const survey:any = JSON.parse(localStorage.getItem('talexio') ?? "{}");

  Object.keys(survey).forEach((k:any) => {
    const e = survey[k];
    if (e.age && e.car_count){
      Object.keys(e.car_count).forEach((ck:any) => {
        if ( ck && ck.substr(-1) == '0' && e.car_count[ck] != '' ) {
          labels.push( e.car_count[ck] );

          if (!_chartData[e.car_count[ck]]) _chartData[e.car_count[ck]] = 0;
          _chartData[e.car_count[ck]]++;
        }

        if ( ck && ck.substr(-1) == '0' && e.car_count[ck] != '' ) {
          const k2 = ck.substr(0, ck.length - 1) + "1"
          const lbl = `${e.car_count[ck]} ${e.car_count[k2]}`;
          labels2.push(lbl);

          if (!_chartData2[lbl]) _chartData2[lbl] = 0;
          _chartData2[lbl]++;
        }
      });
    }
  });
  labels = Array.from(new Set(labels));
  labels.sort();
  
  labels.forEach((e,i) => {
    chartData.push(_chartData[e]);
  });

  console.log(labels);
  console.log(_chartData);
  console.log(chartData);

  labels2 = Array.from(new Set(labels2));
  labels2.sort();
  labels2.forEach((e,i) => {
    chartData2.push(_chartData2[e]);
    tableData.push({
      make: e,
      count: _chartData2[e]
    })
  });
  
  console.log(labels2);
  console.log(_chartData2);
  console.log(chartData2);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      }
    ],
  };

  const data2 = {
    labels2,
    datasets: [
      {
        label: 'Dataset 2',
        data: chartData2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      }
    ],
  };

  return <>
        <div className="mt-5 bg-white shadow-sm rounded-md p-4 text-left">
          <p className="text-xl font-bold mb-5">The car make and model distribution</p>
          <div className="flex">
              <div className="flex-1  my-0 mx-auto">
                  <Pie options={options} data={data} />
              </div>
              <div className="flex-1 my-0 mx-auto">
                  <Pie options={options2} data={data2} />
              </div>
          </div>
        </div>
        <div className="mt-5 bg-white shadow-sm rounded-md p-4 text-left">
            <p className="text-xl font-bold mb-5">Details</p>
            <div className="w-9/12 my-0 mx-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                          <th>Make & Model</th>
                          <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                      {tableData.map(e => <tr>
                          <td>{e.make}</td>
                          <td>{e.count}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
