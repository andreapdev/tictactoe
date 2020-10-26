import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square (props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  //Lifting state to Game means:
  //1)Deleting the constructor

  //4)Moving handleClick to Game


  renderSquare(i) {
    //2) Replacing this.state.squares with this.props.squares
    //3) Replacing this.handleClick with this.props.onClick
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={()=> this.props.onClick(i)}
      />
    );
  }

  render() {
//The Game component is now rendering the game status 
//so we remove the call to calculateWinner and its display
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  //We'll add a history array that stores all the states
  //Because we want it to be displayed in the Game component we'll place it here
  //This allows us to move the squares state from Board to Game *lifting it up* again!
  //This means Game has full control over Board

  //First we set up initial state within its constructor
  constructor (props){
    super (props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }
  handleClick(i) {
    //handleClick is moved from Board and modified to use history
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  render() {
    //Updating to use the most recent history entry 
    //to determine and display game status
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status= `Winner: ${winner}`;
    }else{
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
