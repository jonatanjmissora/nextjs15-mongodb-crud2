"use client"

import { useState } from "react"
import Modal from "./Modal"

export default function FormWithUseActionState() {

  const [inputValues, setInputValues] = useState({ title: "", content: "" })
  const [show, setShow] = useState(false)

  return (
    <>
    {
        show

          ? (
              <Modal inputValues={inputValues} setShow={setShow}/>
            )
          : ( 
              <form onSubmit={(e) => e.preventDefault()}  className='flex gap-4 flex-col p-4 m-4 w-1/4'>
            
                <h2 className='text-2xl font-bold tracking-wide'>useActionState</h2>

                <input className="input" type="text" name="title" placeholder="... title" onChange={(e) => setInputValues({...inputValues, [e.currentTarget.name]: e.currentTarget.value})}/>

                <input className="input" type="text" name="content" placeholder="content" onChange={(e) => setInputValues({...inputValues, [e.currentTarget.name]: e.currentTarget.value})}/>

                <button className='btn btn-primary' onClick={() => setShow(true)} type="submit">Crear</button>
                
              </form>
            )
      }
    </>
  )
}


