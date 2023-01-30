import { useState } from "react";

type ChildProps = {
  onStart?:(val: string) => void
  onShowReport?:() => void
};
const Intro: React.FC<ChildProps> = ({
  onStart=()=>{},
  onShowReport=()=>{}  
}) => {

  const [name, setName] = useState('');
  const handleClick = () => {
    onStart(name);
  }

  return (
    <div className="intro-page">
      <div className='side-panel flex items-center justify-between'>
        <img className='flex-none hidden lg:inline h-screen relative' src={process.env.PUBLIC_URL + '/main-side.jpg'} alt="" />
        <div className='flex-auto p-6 items-center justify-center'>
            <div className='w-2/4 mx-auto my-0 items-center justify-center text-center'>
                <div className='w-fit mx-auto my-0 items-center justify-center text-center'>
                    <h1 className='text-5xl font-extrabold text-right'>
                        <img className='relative w-12 mr-2 inline' src={process.env.PUBLIC_URL + '/talexio.jpg'} />
                        Welcome to
                    </h1>
                    <h1 className='text-9xl font-extrabold'>Talexio</h1>
                    <h1 className='text-5xl font-extrabold text-left'>Quick <span className='text-violet-700'>Survey</span></h1>
                </div>
                <div className='mx-auto my-0 mt-20 items-center justify-center text-center'>
                    <div className='mx-auto my-0'>

                        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)}
                            className="w-72 p-2 mx-auto my-0 mb-5 rounded-md border border-violet-700 focus:border-violet-800 focus:ring-violet-800" 
                            placeholder="Enter your name here" />

                    </div>
                    
                    <button onClick={() => handleClick()} 
                      className="mt-3 bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg text-3xl px-20 py-5">
                        Let's Start
                    </button>

                    <div className='mt-16 text-center text-gray-400'>
                        * Lorem ipsum dolor sit amet consectetur adipiscing elit, scelerisque fames dapibus viverra vestibulum urna molestie vulputate, nisl platea senectus nisi turpis taciti. Semper blandit fames posuere metus orci faucibus mollis ut mus.
                    </div>
                    
                    <div className='mt-16 text-center'>
                        <a className='text-violet-700 underline text-lg cursor-pointer' onClick={() => onShowReport()}>Survey Results</a>
                    </div>

                    <div className='mt-20 text-center text-gray-400'>
                    © Copyright to Talexio, Web Services. 2023
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
