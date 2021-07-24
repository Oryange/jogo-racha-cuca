import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

class Feedback extends React.Component {
  feedback() {
    const state = JSON.parse(localStorage.state);
    const score = state.player.assertions;
    const THREE = 3;
    if (score < THREE) return 'Podia ser melhor...';
    if (score >= THREE) return 'Mandou bem!';
  }

  placar() {
    const state = JSON.parse(localStorage.state);
    const total = state.player.score;
    return total;
  }

  questions() {
    const state = JSON.parse(localStorage.state);
    const acertos = state.player.assertions;
    return acertos;
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <p>
          { this.feedback() }
        </p>
        <section>
          <p>
            { this.placar() }
          </p>
          <p>
            { this.questions() }
          </p>
        </section>
        <Link to="/">
          <button
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;