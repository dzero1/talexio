import React, { PropsWithChildren } from 'react';

function Outro({children}: PropsWithChildren) {
  return (
    <div className="outro-page">
      <div className='flex items-center justify-center'>
        
        <div className='mt-48 w-fit mx-auto my-0 items-center justify-center text-center'>
            <h1 className='text-9xl font-extrabold'>Talexio</h1>
            <h1 className='text-5xl font-extrabold'>Quick <span className='text-violet-700'>Survey</span></h1>

            <div className='mt-16 text-3xl font-bold'>
              {children}
            </div>
            <h1 className='mt-16 text-2xl font-extrabold'>
              <span className='text-violet-700'>Thank you</span> for taking the time to complete this survey.
            </h1>
            <div className='text-xl w-2/4 mx-auto my-0 mt-5'>
              We truly value the information you have provided. Your responses will contribute to our analyses of the texts and suggest new lines of approach to the corpus data.
            </div>
        </div>
      </div>
    </div>
  );
}

export default Outro;
