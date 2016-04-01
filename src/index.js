// import React from 'react';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import App from './components/app';
import BoardList from './components/boardList';
import BoardContainer from './components/board';
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import WS from './lib/ws-trello'



WS(TOKEN, [data => console.log(data)], ["56f10fa9f7d9324f06681cfd"])

import CardDetails from './components/cardDetails';


import Modal from 'react-modal'
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
      marginBottom: "40px",
      backgroundColor: "#F1F1F1"
  }
}


import {reducers} from './store/reducers'

// import MockTrello from './lib/trello.mock.js'

console.log(reducers)
export const store = createStore(
  combineReducers({
    entities: reducers,
    user: (state = {isLoggedIn:false}, action) => {
        if(action.type == "login")
            return {...state, isLoggedIn: true}
        if(action.type == "select:card")
            return {...state, isModalOpen: action.id}

        return state
    },
    routing: routerReducer
  }),
  {},
// MockTrello,
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

window.__store = store

const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => console.log(location))

import actions from './store/actions'

function CardModal({params}) {
    return (
        <Modal
            isOpen={true}
            onRequestClose={() => browserHistory.push(`/board/${params.boardId}/`)}
            style={style}
            >
                <CardDetails cardId={params.cardId}/>
            </Modal>
    )
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="boards" component={BoardList}/>
            <Route path="board/:boardId/" component={BoardContainer}>
                <Route path="card/:cardId" component={CardModal}/>
            </Route>
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
