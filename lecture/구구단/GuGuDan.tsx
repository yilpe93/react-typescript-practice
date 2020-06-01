import * as React from 'react';
import { useState, useRef } from 'react';

// <> === React.Fragment
const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const input = inputEl.current;

    if (parseInt(value) === first * second) {
      setResult('정답');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');      
    } else {
      setResult('땡');
      setValue('');
    }

    if (input) {
      input.focus();
    }
  }

  return (
    <>
      <div>{ first } 곱하기 { second }</div>
      <form onSubmit={onSubmitForm}>
        <input 
          ref={inputEl}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </>
  )
}

export default GuGuDan