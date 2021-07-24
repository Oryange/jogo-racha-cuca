import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1>Configurações</h1>
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default Settings;
