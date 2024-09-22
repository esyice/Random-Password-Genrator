
import { useEffect, useState,useCallback, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [spacialChar , setSpacialChar] = useState(false)
  const [password , setPassword] = useState("")

  const passwordRef = useRef(null)
  
  const passwordGenrater = useCallback(() => {
      let generatedPassword = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
      if (numberAllowed) {
          str += "0123456789";
      }
      
      if(spacialChar) str += "!@#$%^&*-_+=[]{}~`"

      for (let i = 0; i < length; i++) { 
          const randomIndex = Math.floor(Math.random() * str.length);
          generatedPassword += str[randomIndex];
      }
      
      setPassword(generatedPassword);
  
  }, [numberAllowed, spacialChar, length]); 
  useEffect(()=>{
    passwordGenrater()
  },[length ,numberAllowed, spacialChar])

  const handelCopy = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password)
},[password])




  const handelChange = (e) =>{
    setLength(e.target.value)
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1  className='text-white text-center my-3'>Password Genrator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input   className="outline-none w-full py-1 px-3" type="text" value={password} ref={passwordRef} readOnly /> 
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={handelCopy}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <input  type="range" min={8} max={50} onChange={handelChange} value={length} className='cursor-pointer'/>
        <label>length : {length}</label>

      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={setNumberAllowed} onChange={()=>{setNumberAllowed((perv)=>!perv)}}/>
        <label>Numers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={setSpacialChar} onChange={()=>{setSpacialChar((perv)=>!perv)}}/>
        <label>spacial charaters</label>
      </div>
    </div>

  )
}

export default App
