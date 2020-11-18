import * as React from "react";
import { Component, createRef } from "react"

interface State {
  state: "waiting" | "now" | "ready";
  message: string;
  result: number[];
}

class ResponseCheck extends Component<{}, State> {
  state: State = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: []
  }

  timeout: number | null = null;
  startTime: number | null = null;
  endTime: number | null = null;

  onClickScreen = () => {
    const { state } = this.state;
    if (state === "waiting") {
      this.timeout.current = window.setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭"
        });

        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초 랜덤

      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요."
      });
    } else if (state === "ready") {
      if (this.timeout.current) {
        clearTimeout(this.timeout.current);
      }

      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "now") {
      endTime.current = new Date().getTime();

      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }

  onReset = () => {
    this.setState({
      result: []
    })
  }

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간: {result.reduce((a, c) => a + c) / result.length} ms
        </div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };
}

// const ResponseCheck = () => {
//   const [state, setState] = useState("waiting");
//   const [message, setMessage] = useState("클릭해서 시작하세요.");
//   const [result, setResult] = useState<number[]>([]);

//   // useRef OverLoading
//   const timeout = useRef<number | null>(null);
//   const startTime = useRef(0);
//   const endTime = useRef(0);

//   const onClickScreen = useCallback(() => {
//     if (state === "waiting") {
//       timeout.current = window.setTimeout(() => {
//         setState("now");
//         setMessage("지금 클릭");
//         startTime.current = new Date().getTime();
//       }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초 랜덤

//       setState("ready");
//       setMessage("초록색이 되면 클릭하세요.");
//     } else if (state === "ready") {
//       if (timeout.current) {
//         clearTimeout(timeout.current);
//       }

//       setState("waiting");
//       setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
//     } else if (state === "now") {
//       endTime.current = new Date().getTime();

//       setState("waiting");
//       setMessage("클릭해서 시작하세요.");
//       setResult((prevResult) => {
//         return [...prevResult, endTime.current - startTime.current];
//       });
//     }
//   }, [state]);

//   const onReset = useCallback(() => {
//     setResult([]);
//   }, []);

//   const renderAverage = () => {
//     return result.length === 0 ? null : (
//       <>
//         <div>
//           평균 시간: {result.reduce((a, c) => a + c) / result.length} ms
//         </div>
//         <button onClick={onReset}>리셋</button>
//       </>
//     );
//   };

//   return (
//     <>
//       <div id="screen" className={state} onClick={onClickScreen}></div>
//       {renderAverage()}
//     </>
//   );
// };

export default ResponseCheck;
