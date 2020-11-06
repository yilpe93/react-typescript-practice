import * as React from "react";
import { Component } from "react";

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

interface State {
  result: string,
  imgCord: imgCords,
  score: number
}

class RSP extends Component<{}, State> {
  state = {
    result: "",
    imgCord: rspCords.바위,
    score: 0
  }

  changeHand = () => {
    const { imgCord } = this.state;
    if (imgCord === rspCords.바위) {
      this.setState({ imgCord: rspCords.가위 })
    } else if (imgCord === rspCords.가위) {
      this.setState({ imgCord: rspCords.보 })
    } else if (imgCord === rspCords.보) {
      this.setState({ imgCord: rspCords.바위 })
    }
  }

  interval: number | null = null;

  componentDidMount() {  // 컴포넌트가 첫 렌더링된 후
    this.interval = setInterval(this.changeHand, 100);
  }

  componentWillUnmount() {  // 컴포넌트가 제거되기 직전
    clearInterval(this.interval!);
  }

  onClickBtn = (choice: keyof typeof rspCords) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const { imgCord } = this.state;
    clearInterval(this.interval!);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({ result: "비겼습니다!" });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1
        }
      });
    }

    setTimeout(() => {
      this.interval = window.setInterval(this.changeHand, 100);
    }, 1000);
  };

  render() {
    const { result, score, imgCord } = this.state;

    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord}` }}></div>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn("가위")}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP;