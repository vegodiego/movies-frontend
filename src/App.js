import './stylesheets/App.css';
import TopRated from './components/top-rated';
import Favorites from './components/favorites';
import Popular from './components/popular';
import Upcoming from './components/upcoming';
import NowPlaying from './components/now-playing';
import Register from './components/register';
import Login from './components/login';
import Header from './components/header';
import Broken from './components/broken';
import NoMatch from './components/noMatch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import {HashRouter, Switch, Route} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/">
             <Header /> 
             <TopRated />  
            </Route>
            <Route exact path="/favorites">
              <Header />
              <Favorites />
            </Route>
            <Route path="/popular">
              <Header />
              <Popular />
            </Route>
            <Route path="/upcoming">
              <Header />
              <Upcoming />
            </Route>
            <Route path="/now-playing">
              <Header />
              <NowPlaying />
            </Route>
            <Route path="/register">
              <Header />
              <Register />
            </Route>
            <Route path="/login">
              <Header />
              <Login />
            </Route>
            <Route path="/broken">
              <Broken />
            </Route>
            <Route exact path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </HashRouter>  
    );
  }
}



export default App;