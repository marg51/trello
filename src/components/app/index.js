import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import Trello from '../../lib/trello'
import TrelloToActions from '../../lib/trello-to-actions'


import Login from '../login'
import Debug from '../../utils/debug'

class AppContainer extends Component {
    componentWillMount() {
        Trello.getMember().then(data => {
            Trello.getWs().listenTo("member", data.id)
            Trello.getWs().listenTo("orga", "508666007e639aad130003e3")
        })
        Trello.getWs().onEvent(data => {
            TrelloToActions(this.props.state, this.props.dispatch, data)
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

function App(props) {
    let {isLoggedIn, isModalOpen, children, dispatch, state} = props
    const closeModal = () => {dispatch({type: 'select:card', id: 0})}
    if(isLoggedIn)
        return (<div>
            <AppContainer {...props}>{children}</AppContainer>
            </div>)
  return (
      <div>
        <Login/>
      </div>
  )
}

export default connect(
    state => ({isLoggedIn: state.user.isLoggedIn, isModalOpen: state.user.isModalOpen, state})
)(App)
