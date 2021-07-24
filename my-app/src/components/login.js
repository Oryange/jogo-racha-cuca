import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGame } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  handler(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  handlerLocalStorage() {
    const { name, email } = this.state;
    const player = {
      player: {
        name,
        email,
        assertions: 0,
        score: 0,
        gravatarEmail: email },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  fetchToken() {
    const { fetchQuestions } = this.props;
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        fetchQuestions('5', data.token);
      });
  }

  isAuthenticated() {
    const { email, name } = this.state;
    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegexp.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  submit() {
    this.handlerLocalStorage();
    this.fetchToken();
  }

  render() {
    return (
      <div>
        <input
          name="name"
          type="text"
          placeholder="Escreva seu nome"
          onChange={ (e) => this.handler(e) }
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={ (e) => this.handler(e) }
        />
        <Link to="/player">
          <button
            type="button"
            disabled={ this.isAuthenticated() }
            onClick={ () => this.submit() }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (mount, token) => dispatch(fetchGame(mount, token)),
});

export default connect(null, mapDispatchToProps)(Login);
