import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from './header';

let TEN = 10;
const THREE = 3;
let wigthPoint = 0;

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      nQuestion: 0,
      isDisabled: false,
      showCorrect: false,
      timer: 30,
      timerStatus: '',
      next: true,
    };
  }

  componentDidMount() {
    this.timerOnScreen();
  }

  ranking() {
    const { player: { name, score, gravatarEmail } } = JSON.parse(localStorage.state);
    const emailHash = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${emailHash}`;
    const object = [{ name, score, picture }];
    if (localStorage.ranking) {
      const objRanking = JSON.parse(localStorage.ranking);
      const newRanking = [...objRanking, object[0]];
      localStorage.ranking = JSON.stringify(newRanking);
    } else {
      localStorage.setItem('ranking', JSON.stringify(object));
    }
  }

  nextQuestion() {
    const { nQuestion, showCorrect } = this.state;
    const FOUR = 4;
    if (nQuestion <= FOUR) {
      this.setState((previous) => ({
        nQuestion: previous.nQuestion + 1,
        isDisabled: false,
        showCorrect: false,
        next: true,
        timer: 30,
        timerStatus: '',
      }));
    }
    if (nQuestion === FOUR && showCorrect) {
      this.setState({ next: false });
      this.ranking();
      const { history } = this.props;
      history.push('/feedback');
    }

    this.timerOnScreen();
  }

  // função que mostra as respostas corretas e incorretas
  handleShow(difficulty = undefined) {
    this.timerStop();
    this.setState({ isDisabled: true, showCorrect: true, next: false });
    const { timer } = this.state;
    const state = JSON.parse(localStorage.state);
    if (difficulty !== undefined) {
      state.player.assertions += 1;
      if (difficulty === 'easy') wigthPoint = 1;
      if (difficulty === 'medium') wigthPoint = 2;
      if (difficulty === 'hard') wigthPoint = THREE;
    }
    if (difficulty === undefined) {
      wigthPoint = 0;
      TEN = 0;
    }
    state.player.score += Number(TEN + (timer * wigthPoint));
    localStorage.state = JSON.stringify(state);
  }

  btnCorrect(correctAnswer, difficulty) {
    const { isDisabled, showCorrect } = this.state;
    return (
      <button
        type="button"
        className={ showCorrect ? 'Green' : '' }
        onClick={ () => this.handleShow(difficulty) }
        disabled={ isDisabled }
      >
        {correctAnswer}
      </button>
    );
  }

  btnIncorrect(incorrectAnswer, index) {
    const { isDisabled, showCorrect } = this.state;
    return (
      <button
        type="button"
        className={ showCorrect ? 'Red' : '' }
        onClick={ () => this.handleShow() }
        disabled={ isDisabled }
      >
        {incorrectAnswer}
      </button>
    );
  }

  btnNext() {
    const { next } = this.state;
    return (
      <button
        type="button"
        disabled={ next }
        onClick={ () => this.nextQuestion() }
      >
        Próxima
      </button>
    );
  }

  timerStop() {
    this.setState({ timerStatus: 'stop' });
  }

  timerOnScreen() {
    const MAXTIME = 1000;
    const MAXNUMBERQUESTION = 5;
    const cronometro = setInterval(() => {
      const { timer, nQuestion, timerStatus } = this.state;
      if (timer !== 0 && nQuestion !== MAXNUMBERQUESTION && timerStatus !== 'stop') {
        this.setState((previous) => ({ timer: previous.timer - 1 }));
      }
      if (timer === 0) {
        this.handleShow();
      }
      if (timerStatus === 'stop' || nQuestion > MAXNUMBERQUESTION) {
        clearInterval(cronometro);
      }
    }, MAXTIME);
  }

  render() {
    const { data: { results }, fetching } = this.props;
    const { nQuestion, timer, showCorrect } = this.state;
    return (
      <div>
        <Header />
        {
          fetching ? (<p>...loading </p>) : (
            <div>
              { results
                .map((e, index) => {
                  if (nQuestion === index) {
                    return (
                      <section key={ index }>
                        <p>
                          TEMPO:
                          { timer }
                        </p>
                        <h1>
                          { e.category }
                        </h1>
                        <p>
                          { e.question }
                        </p>
                        <div>
                          <h2>Opções:</h2>
                          {
                            [...e.incorrect_answers, e.correct_answer]
                              .sort()
                              .map((answer, i) => (
                                answer === e.correct_answer
                                  ? this.btnCorrect(answer, e.difficulty)
                                  : this.btnIncorrect(answer, i)
                              ))
                          }
                        </div>
                      </section>
                    );
                  }
                })}
              {
                showCorrect ? this.btnNext() : ''
              }
            </div>)
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.user.results,
  fetching: state.user.isFetching,
});

export default connect(mapStateToProps, null)(Player);
