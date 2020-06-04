import * as React from "react";
import { useState, useRef } from "react";

// Type 추론이 안될경우 <>(제너릭)을 사용한다.
// useState의 default 값을 설정하기에 굳이 Type 추론을 적지 않는다.

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = inputEl.current;

    if (parseInt(value) === first * second) {
      setResult("정답");
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
    } else {
      setResult("땡");
      setValue("");
    }

    if (input) {
      input.focus();
    }
  };

  return (
    <>
      <div>
        {first} 곱하기 {second}
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div>{result}</div>
    </>
  );
};

export default GuGuDan;
