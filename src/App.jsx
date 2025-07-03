import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // use ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "@#$%^&*(){}[]:;/_+=";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const CopyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-300">
        <div className="w-full max-w-md max-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passwordRef}
              className="outline-none w-full py-1 px-3 bg-gray-300"
            ></input>
            <button
              onClick={CopyPasswordToClipboard}
              className="bg-blue-700 outline-none  text-white py-3 px-0.5 shrink-0"
            >
              copy
            </button>
          </div>

          <div className="flex text-sm-3 gap-x-2">
            <div className="flex text-center gap-x-1">
              <input
                type="range"
                min={6}
                max={99}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              ></input>
              <label>length{length}</label>

              <div className="flex item-center gap-x-1">
                <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"
                onChange={()=>{setNumberAllowed((prev)=>!prev)}}></input>
                <lable htmlFor="numberInput">numbers</lable>
              </div>

               <div className="flex item-center gap-x-1">
                <input type="checkbox" defaultChecked={charAllowed} id="characterInput"
                onChange={()=>{setCharAllowed((prev)=>!prev)}}></input>
                <lable htmlFor="characterInput">Characters</lable>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
