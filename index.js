class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      prevValue: "0",
      expression: "",
      operator: "",
      lastClicked: "",
      evaluate: false,
      decimal: false,
      negative: false,
    };
    this.handleNumbers = this.handleNumbers.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.handleMaxDigits = this.handleMaxDigits.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
  }

  handleNumbers() {
    const currVal = this.state.currentValue;
    const ev = event.target.value;
    const prevValue = this.state.prevValue;
    const op = this.state.operator;
    const lastClicked = this.state.lastClicked;
    const evaluate = this.state.evaluate;
    const expression = this.state.expression;
    if (
      currVal.length === 20 ||
      expression.length === 25 ||
      currVal === "LIMIT!!!"
    ) {
      this.handleMaxDigits();
    } else {
      if (lastClicked === "" || currVal === "0" || evaluate === true) {
        this.setState({
          expression: ev,
          currentValue: ev,
          lastClicked: ev,
          evaluate: false,
          operator: "",
        });
      } else if (
        (/[0-9]/.test(lastClicked) && currVal !== "0") ||
        lastClicked === "-" ||
        lastClicked === "."
      ) {
        this.setState({
          expression: expression + ev,
          currentValue: currVal + ev,
          lastClicked: ev,
          operator: "",
        });
      } else {
        this.setState({
          expression: expression + ev,
          currentValue: ev,
          lastClicked: ev,
          operator: "",
        });
      }
    }
  }
  handleOperators() {
    const currVal = this.state.currentValue;
    const ev = event.target.value;
    const prevValue = this.state.prevValue;
    const op = this.state.operator;
    const lastClicked = this.state.lastClicked;
    const evaluate = this.state.evaluate;
    const expression = this.state.expression;
    this.setState({ decimal: false });
    if (evaluate) {
      this.setState({
        currentValue: currVal + ev,
        expression: currVal + ev,
        operator: ev,
        lastClicked: ev,
        evaluate: false,
      });
    } else {
      if (ev !== "-") {
        if (lastClicked !== ev && op) {
          this.setState({
            currentValue: ev,
            expression: this.state.negative
              ? expression.slice(0, -2) + ev
              : expression.slice(0, -1) + ev,
            operator: ev,
            lastClicked: ev,
            negative: false,
          });
        } else {
          this.setState({
            currentValue: ev,
            expression: lastClicked === ev ? expression : expression + ev,
            operator: ev,
            lastClicked: ev,
            negative: false,
          });
        }
      } else {
        if (!this.state.negative) {
          this.setState({
            currentValue: ev,
            expression: expression + ev,
            operator: ev,
            lastClicked: ev,
            negative: true,
          });
        }
      }
    }
  }
  handleEqual() {
    if (this.state.evaluate === false) {
      let expression = this.state.expression;
      while (/[⋅+‑/]$/.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/⋅/g, "*");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentValue: answer.toString(),
        expression: expression.replace(/\*/g, "⋅") + "=" + answer,
        prevVal: answer,
        evaluate: true,
        operator: "",
      });
    }
  }
  handleMaxDigits() {
    this.setState({
      prevValue:
        this.state.currentValue === "LIMIT!!!"
          ? this.state.prevValue
          : this.state.currentValue,
      currentValue: "LIMIT!!!",
    });
    setTimeout(
      () =>
        this.setState({
          currentValue: this.state.prevValue,
        }),
      1000
    );
  }
  handleClear() {
    if (event.target.value === "clear") {
      this.initializeState();
    } else {
      if (
        this.state.currentValue !== "0" &&
        this.state.currentValue.length > 1
      ) {
        this.setState({
          currentValue: this.state.currentValue.slice(0, -1),
          expression: this.state.expression.slice(0, -1),
        });
      } else {
        this.setState({
          expression:
            this.state.currentValue === ""
              ? this.state.expression
              : this.state.expression.slice(0, -1),
          currentValue: "",
          decimal: false,
          negative: false,
          operator: "",
        });
      }
    }
  }
  handleDecimal() {
    if (this.state.decimal === false) {
      this.setState({
        expression:
          this.state.expression === ""
            ? "0."
            : this.state.expression + event.target.value,
        currentValue:
          this.state.currentValue === ""
            ? "0."
            : this.state.currentValue + event.target.value,
        decimal: true,
        lastClicked: event.target.value,
        operator: "",
      });
    }
  }

  initializeState() {
    this.setState({
      currentValue: "0",
      prevValue: "0",
      expression: "",
      operator: "",
      lastClicked: "",
      evaluate: false,
      decimal: false,
      negative: false,
    });
  }

  render() {
    return (
      <div className="calculator">
        <Screen
          output={this.state.expression}
          input={this.state.currentValue}
        />
        <Buttons
          numbers={this.handleNumbers}
          operators={this.handleOperators}
          decimal={this.handleDecimal}
          equal={this.handleEqual}
          clear={this.handleClear}
        />
      </div>
    );
  }
}
class Buttons extends React.Component {
  render() {
    return (
      <div className="container-buttons">
        <button
          className="big-button button"
          id="clear"
          value="clear"
          onClick={this.props.clear}
        >
          Clear
        </button>
        <button
          className="big-button button"
          id="del"
          value="del"
          onClick={this.props.clear}
        >
          Del
        </button>
        <button
          className="button"
          id="seven"
          value="7"
          onClick={this.props.numbers}
        >
          7
        </button>
        <button
          className="button"
          id="eight"
          value="8"
          onClick={this.props.numbers}
        >
          8
        </button>
        <button
          className="button"
          id="nine"
          value="9"
          onClick={this.props.numbers}
        >
          9
        </button>
        <button
          className="button"
          id="divide"
          value="/"
          onClick={this.props.operators}
        >
          /
        </button>
        <button
          className="button"
          id="four"
          value="4"
          onClick={this.props.numbers}
        >
          4
        </button>
        <button
          className="button"
          id="five"
          value="5"
          onClick={this.props.numbers}
        >
          5
        </button>
        <button
          className="button"
          id="six"
          value="6"
          onClick={this.props.numbers}
        >
          6
        </button>
        <button
          className="button"
          id="multiply"
          value="⋅"
          onClick={this.props.operators}
        >
          x
        </button>
        <button
          className="button"
          id="one"
          value="1"
          onClick={this.props.numbers}
        >
          1
        </button>
        <button
          className="button"
          id="two"
          value="2"
          onClick={this.props.numbers}
        >
          2
        </button>
        <button
          className="button"
          id="three"
          value="3"
          onClick={this.props.numbers}
        >
          3
        </button>
        <button
          className="button"
          id="subtract"
          value="-"
          onClick={this.props.operators}
        >
          -
        </button>
        <button
          className="button"
          id="zero"
          value="0"
          onClick={this.props.numbers}
        >
          0
        </button>
        <button
          className="button"
          id="decimal"
          value="."
          onClick={this.props.decimal}
        >
          .
        </button>
        <button
          className="button"
          id="equals"
          value="="
          onClick={this.props.equal}
        >
          =
        </button>
        <button
          className="button"
          id="add"
          value="+"
          onClick={this.props.operators}
        >
          +
        </button>
      </div>
    );
  }
}
class Screen extends React.Component {
  render() {
    return (
      <div className="screen">
        <p>{this.props.output}</p>
        <p id="display">{this.props.input}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("wrapper"));
