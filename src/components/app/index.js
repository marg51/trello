import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import Trello from '../../lib/trello'
import TrelloToActions from '../../lib/trello-to-actions'

import Debug from '../../utils/debug'

class BoardContainer extends Component {
    componentWillMount() {
        Trello.getMember().then(data => {
            Trello.getWs().listenTo("member", data.id)
            Trello.getWs().listenTo("orga", "508666007e639aad130003e3")
        })
        Trello.getWs().onEvent(data => {
            dispatch(TrelloToActions(data))
        })
    }
    render() {
        const children = this.props.children
        return (<div>
            <header>
                Links:
                {' '}
                <Link to="/">Home</Link>
                {' '}
                <Link to="/boards">Boards</Link>
                {' '}
                Socket: <Debug object={Trello.getWs()}>{Trello.getWs().getStatus()}</Debug>
            </header>
            {children}
        </div>)
    }
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

function App({isLoggedIn, isModalOpen, children, dispatch}) {
    const closeModal = () => {dispatch({type: 'select:card', id: 0})}
    if(isLoggedIn)
        return (<div>
            <BoardContainer>{children}</BoardContainer>
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
