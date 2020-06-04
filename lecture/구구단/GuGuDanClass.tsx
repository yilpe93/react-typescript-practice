import * as React from "react";
import { Component, FormEvent, ChangeEvent } from "react";

interface State {
  first: number;
  second: number;
  value: string;
  result: string;
}

class GuGuDan extends Component<{}, State> {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { result, value, first, second } = this.state;

    if (parseInt(value) === first * second) {
      this.setState((prevState) => {
        return {
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
          result: "정답: " + prevState.value,
        };
      });
    } else {
      this.setState({
        result: "땡",
        value: "",
      });
    }

    if (this.input) {
      this.input.focus();
    }
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  input: HTMLInputElement | null = null;

  onRefInput = (c: HTMLInputElement) => {
    this.input = c;
  };

  return() {
    return (
      <>
        <div>
          {this.state.first} 곱하기 {this.state.second}
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.onRefInput}
            onChange={this.onChange}
            type="number"
            value={this.state.value}
          />
          <button>입력!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}
