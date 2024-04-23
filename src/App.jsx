import React, { useState } from 'react';
import { HiClipboard } from 'react-icons/hi';

function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  function handleChange(event) {
    setLength(event.target.value);
  }

  function generatePassword() {
    const charset = [
      useUppercase && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      useLowercase && 'abcdefghijklmnopqrstuvwxyz',
      useNumbers && '0123456789',
      useSymbols && '!@#$%^&*',
    ]
      .filter(Boolean)
      .join('');

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  }

  function copyPassword() {
    if (password) {
      navigator.clipboard.writeText(password);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-200">Secure Password Generator</h2>
        <div className="flex items-center mb-4">
          <label htmlFor="length" className="text-gray-200 mr-2">Length:</label>
          <input
            type="number"
            id="length"
            min="4"
            max="20"
            value={length}
            onChange={handleChange}
            className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Checkbox id="uppercase" checked={useUppercase} onChange={() => setUseUppercase(!useUppercase)}>Uppercase Letters</Checkbox>
          <Checkbox id="lowercase" checked={useLowercase} onChange={() => setUseLowercase(!useLowercase)}>Lowercase Letters</Checkbox>
          <Checkbox id="numbers" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)}>Numbers</Checkbox>
          <Checkbox id="symbols" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)}>Symbols</Checkbox>
        </div>
        <div className="relative mb-4 flex justify-between">
          <input
            type="text"
            value={password}
            readOnly
            className="bg-gray-700 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-700"
          />
          <button
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={copyPassword}
          >
            <HiClipboard className="inline-block w-6 h-6" />
          </button>
        </div>
        <button
          className="w-full py-3 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none mb-4"
          onClick={generatePassword}
        >
          Generate Password
        </button>
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center ${showModal ? '' : 'hidden'}`}>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-white">Password copied!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Checkbox = ({ id, checked, onChange, children }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label htmlFor={id} className="text-gray-200">{children}</label>
    </div>
  );
}

export default App;
