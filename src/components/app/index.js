import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'

function Foo() {
  return <div>I am Foo!</div>
}

function Wut({children}) {
  return <div><header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/boards">Boards</Link>
      </header>
      {children}
    </div>
}

class Bar extends Component {
  render() {
    return (
      <h1>B</h1>
    );
  }
}

function login() {
    return {
        type: 'login'
    }
}

function LoggedIn() {
    return (
      <div>

      </div>
    );
}



function App({login, isLoggedIn, children}) {
    if(isLoggedIn)
        return (<div>{Wut({children})}</div>)
  return (
      <div>
        <button onClick={login}>Login</button>
      </div>
  )
}

export default connect(
    state => ({isLoggedIn: state.app.isLoggedIn}),
    {login}
)(App)
