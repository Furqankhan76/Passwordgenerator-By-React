import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [length, setlength] = useState(8)
 const [numberallowed, setnumberallowed] = useState(false)
 const [chaAllowed, setcharallowed] = useState(false)
 const [password, setpassword] = useState('')

 const passwordref = useRef(null); 

 const generatepassword = useCallback(() => {
   let pass = "";
   let str = "ASDFGHJBVCXXCVBNFDFGNBwgfdfnbdbnbvvbnbv";

   if (numberallowed) str += "0123456789";
   if (chaAllowed) str += "~!@#$%^&*()_+";

   for (let i = 1; i < length; i++) {
     const char = Math.floor(Math.random() * str.length + 1);
     pass += str.charAt(char);
   }
   setpassword(pass);
 }, [length, numberallowed, chaAllowed]);

useEffect(() => {
generatepassword()
},[length, numberallowed, chaAllowed])

const copypasswordtoclipboard = () => {
window.navigator.clipboard.writeText(password)
  passwordref.current?.select()
}



  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-500 text-orange-500">
      <h1 className="text-white text-center my-3 ">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordref}
        />

        <button 
        onClick={copypasswordtoclipboard}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy
        </button>
      </div>


      {/* ddda */}

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=> { 
              console.log(e);
              
              setlength(e.target.value)

            }}
            name=""
            id=""
          />
          <label htmlFor="Length">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberallowed}
          onChange={() => setnumberallowed((prev) => !prev)}
          name=''
          id=''
           />
           <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={chaAllowed}
          onChange={() => setcharallowed((prev) => !prev)}
          name=''
          id=''
           />
           <label htmlFor="character">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App
