import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import Trello from '../../lib/trello'
import Modal from 'react-modal'

import CardDetails from '../cardDetails/'

function Foo() {
  return <div>I am Foo!</div>
}

function BoardContainer({children}) {
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
    function login() {
        Trello.login().then(() => {
            dispatch({type: 'login'})
            Trello.getBoards()
        }, () => {
            alert('error')
        })
    }
    login()
    return (
      <div>
        <button onClick={login}>Please login</button>
      </div>
    );
}

const ConnectedLogin = connect((state) => ({state}))(Login)

const style = {
  overlay : {
    zIndex            : 2,
    backgroundColor   : 'rgba(0,0,0,.6)',
    overflow: "auto"
  }, content: {
      maxWidth: "700px",
      margin: "auto",
      borderWidth: 0,
      bottom: null,
      marginBottom: "40px"
  }
}

function App({isLoggedIn, isModalOpen, children, dispatch}) {
    const closeModal = () => {dispatch({type: 'select:card', id: 0})}
    if(isLoggedIn)
        return (<div>
            {BoardContainer({children})}
            <Modal
                isOpen={!!isModalOpen}
                onRequestClose={closeModal}
                style={style}
                >

                    <CardDetails cardId={isModalOpen}/>
                </Modal>
            </div>)
  return (
      <div>
        <ConnectedLogin/>
      </div>
  )
}

export default connect(
    state => ({isLoggedIn: state.user.isLoggedIn, isModalOpen: state.user.isModalOpen})
)(App)
