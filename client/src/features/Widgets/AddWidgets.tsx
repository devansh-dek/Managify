import { PlusSquare } from 'lucide-react'
import React from 'react';

interface textObj {
    text: string
}

function AddWidgets({ text }: textObj) {
  return (
    <div className='flex flex-col justify-center items-center'>
        <PlusSquare className='h-10 w-10 m-5 mb-1 hover:scale-125 cursor-pointer transition-all' />
        <div className='font-roboto text-md font-semibold'>{ text }</div>
    </div>
  )
}

export default AddWidgets