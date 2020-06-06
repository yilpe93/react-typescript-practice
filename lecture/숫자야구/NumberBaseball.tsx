import React, { useRef, useState, useCallback } from "react";
import Try from "./Try";
import { TryInfo } from "./types";

const getNumbers = () => {
  const condidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  // 랜덤 숫자 4개 중복 없이
  for (let i = 0; i < 4; i += 1) {
    const chosen = condidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
};

const NumberBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [tries, setTries] = useState<TryInfo[]>([]); // 빈 배열은 항상 타이핑 문제를 일으ㄱ킨다.
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e: React.FormEvent) => {
      e.preventDefault();

      const input = inputEl.current;

      if (value === answer.join(",")) {
        setTries((t) => [
          ...t,
          {
            try: value,
            result: "홈런!",
          },
        ]);
        setResult("홈런!");
        alert("게임을 다시 실행합니다.");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        const answerArray = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;

        if (tries.length >= 9) {
          setResult(
            `10번 넘게 틀려서 실패! 답은 ${answer.join(",")} 였습니다.`
          );
          alert("게임을 다시 시작합니다.");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
        } else {
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              console.log("strike", answerArray[i], answer[i]);
            } else if (answer.includes(answerArray[i])) {
              console.log(
                "ball",
                answerArray[i],
                answer.indexOf(answerArray[i])
              );
              ball += 1;
            }
          }

          setTries((t) => [
            ...t,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ]);
          setValue("");
        }
      }

      if (input) {
        input.focus();
      }
    },
    []
  );

  useRef(inputEl);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value),
            []
          )}
        />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + i}차 시도`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball;
