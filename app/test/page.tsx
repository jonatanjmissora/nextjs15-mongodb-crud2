import React from 'react'
import Form from './Form'
import FormWithHook from './FormWithHook'

export default function page() {

  return (
    <div className='h-full flex items-center justify-center'>
      <Form />
      <FormWithHook />
    </div>
  )
}
