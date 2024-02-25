import React from "react"
import { useState,useCallback,useEffect,useRef } from "react"
import './App.css'
function App() {
  const [length, setLength] = useState(8);
  
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // ref hook
  const passwordRef = useRef(null);
  const passWordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "{}[]()*&^%$#@!";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passWordGen();
  },[length,numberAllowed,charAllowed,passWordGen])
  const copyPasswordToclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
 },[password])
 return (
    <>

     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white my-3">PassWord Generator</h1>
       <div className="flex shadow rounded-lg overflow-hidden mb-8">
         <input type="text"
           value={password}
           className="outline-none w-full py-1 px-3"
           placeholder="password"
           readOnly
         ref={passwordRef}></input>  
         
         <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
           onClick={copyPasswordToclipboard}
         >copy</button>


       </div>
       <div className="flex text-sm gap-x-2">
         <div className="flex items-center gap-x-1">
           <input
             type="range"
             min={8}
             max={100}
             value={length}
             className="cursor-pointer"
             onChange={(e)=>{setLength(e.target.value)}}
           ></input>
           <label >Length:{ length}</label>
         </div>
         <div className="flex items-center gap-x-1">
           <input type="checkbox"
             defaultChecked={numberAllowed}
             id="numberInput"
             onChange={() => {
               setNumberAllowed((prev) => !prev);
             }}></input>
           <label htmlFor="numberInput">Numbers</label>
         </div>
          <div className="flex items-center gap-x-1">
           <input type="checkbox"
             defaultChecked={charAllowed}
             id="charInput"
             onChange={() => {
               setCharAllowed((prev) => !prev);
             }}></input>
           <label htmlFor="charInput">Characters</label>
        </div>
       </div>
     </div>
    </>
  )

}
export default App


