import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import Trello from '../../lib/trello'

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

function Login({dispatch}) {
    Trello.login().then(() => {
        dispatch({type: 'login'})
        Trello.getBoards()
    }, () => {
        alert('error')
    })
    return (
      <div>
        Login …
      </div>
    );
}

const ConnectedLogin = connect((state) => ({state}))(Login)



function App({isLoggedIn, children}) {
    if(isLoggedIn)
        return (<div>{Wut({children})}</div>)
  return (
      <div>
        <ConnectedLogin/>
      </div>
  )
}

export default connect(
    state => ({isLoggedIn: state.user.isLoggedIn})
)(App)
