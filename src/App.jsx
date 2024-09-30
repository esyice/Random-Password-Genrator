import { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      characters += "0123456789";
    }

    if (specialChar) {
      characters += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }, [numberAllowed, specialChar, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, specialChar, passwordGenerator]);

  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password, length]);

  const handleChange = (e) => {
    setLength(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input className="outline-none w-full py-1 px-3" type="text" value={password} ref={passwordRef} readOnly />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={handleCopy}>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <input type="range" min={8} max={50} onChange={handleChange} value={length} className="cursor-pointer" />
        <label>Length: {length}</label>
      </div>
      <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-full mt-5" onClick={passwordGenerator}>
        Generate New Password
      </button>
      <div className="flex items-center mt-5 gap-x-1">
        <input type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)} />
        <label>Include Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" checked={specialChar} onChange={() => setSpecialChar(prev => !prev)} />
        <label>Include Special Characters</label>
      </div>
    </div>
  );
}

export default App;