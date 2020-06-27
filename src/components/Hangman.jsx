import React, { Component } from "react";
import "./Hangman.css";
import img0 from "../assets/0.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import { randomWord } from "../components/Words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  resetScore = () => {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  };

  /** render: render game */
  render() {
    const { nWrong, answer } = this.state;
    const { images, maxWrong } = this.props;
    const gameOver = nWrong >= maxWrong;
    const isWinner = this.guessedWord().join("") === answer;
    const altText = `${nWrong}/${maxWrong} guesses`;
    let gameState =this.generateButtons();
    if(isWinner) gameState = <p className="green">You Win !!</p>;
    if(gameOver) gameState = <p className="red">You Lose !!</p>;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={altText} />
        <p className="guess-wrong">
          Guessed Wrong: <span className="red">{nWrong}</span>
          Guessed Right: <span className="green">{this.guessedWord()}</span>
        </p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : answer}
        </p>
        <p className="Hangman-btns">
          {gameState}
        </p>
        <button id="button" onClick={this.resetScore}>
          Restart !!
        </button>
      </div>
    );
  }
}

export default Hangman;
