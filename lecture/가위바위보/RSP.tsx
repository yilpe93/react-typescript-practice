import * as React from "react";
import { useState, useRef, useEffect } from "react";

const rspCords = {
  바위: "0",
  가위: "-142px",
  보: "-284px"
} as const;

const scores = {
  가위: 1,
  바위: 0,
  보: -1
} as const;

type imgCords = typeof rspCords[keyof typeof rspCords]; // "0" | "-142px" | "-284px" 대체

const computerChoice = (imgCords: imgCords) => {
  return (Object.keys(rspCords) as ["바위", "가위", "보"]).find((k) => {
    return rspCords[k] === imgCords;
  })! // `!` 로 종료 처리하여 undefined가 나오지 않음을 확신 시켜준다.
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCord, setImgCord] = useState<imgCords>(rspCords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef<number>();

  const changeHand = () => {
    if (imgCord === rspCords.바위) {
      setImgCord(rspCords.가위);
    } else if (imgCord === rspCords.가위) {
      setImgCord(rspCords.보);
    } else if (imgCord === rspCords.보) {
      setImgCord(rspCords.바위);
    }
  }

  useEffect(() => {
    console.log("다시 실행");
    interval.current = window.setInterval(changeHand, 100);

    return () => {
      console.log("종료");
      clearInterval(interval.current);
    }
  })

  const onClickBtn = (choice: keyof typeof rspCords) => () => {
    clearInterval(interval.current);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore(prevScore => prevScore + 1);
    } else {
      setResult("졌습니다!");
      setScore(prevScore => prevScore - 1);
    }

    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 100);
    }, 1000);
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord}` }}></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}

export default RSP;