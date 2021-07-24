import React from 'react';
import md5 from 'crypto-js/md5';

export default function Header() {
  const state = JSON.parse(localStorage.getItem('state'));
  const emailHash = md5(state.player.email).toString();
  return (
    <div>
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="avatar"
        />
        <p>{state.player.name}</p>
        <div>{state.player.score}</div>
      </header>
    </div>
  );
}
