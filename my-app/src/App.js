import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import Player from './components/player';
import Settings from './components/settings';
import Ranking from './components/ranking';
import Feedback from './components/feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/player" component={ Player } />
      <Route path="/settings" component={ Settings } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}

