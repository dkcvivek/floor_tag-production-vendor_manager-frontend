import React from 'react'
import Button from './Button';
import { Check } from 'lucide-react';

const CreateCheckerSuccessPage = () => {
  return (
    <>          
        <div className='flex items-center flex-col gap-8 min-h-screen bg-green-700 px-5 text-white py-12'>
            <h2 className='text-2xl font-semibold text-white'>Rahul</h2>
            <Check size={65} className='font-bold' />
            <h3 className='text-4xl font-bold'>Account Created</h3>
            <Button label='Assign Checkpoint' src=''/>
            <Button label='Create Checker Account' src=''/>
        </div>
    </>
  )
}

export default CreateCheckerSuccessPage;