import React from 'react';

class Ranking extends React.Component {
  redirect() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const objRanking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1>Ranking</h1>
        {
          objRanking && objRanking
            .map(({ picture, name, score }, i) => (
              <section key={ i }>
                <img
                  src={ picture }
                  alt={ name }
                />
                <p>
                  { name }
                </p>
                <p>
                  { score }
                </p>
              </section>))
        }
        <button
          type="button"
          onClick={ () => this.redirect() }
        >
          Voltar
        </button>
      </div>
    );
  }
}

export default Ranking;
