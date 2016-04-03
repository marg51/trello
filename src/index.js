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

import CardDetails from './components/cardDetails';
import _ from 'lodash'

window._ = _

import CardModal from './components/cardModal'


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

// history.listen(location => console.log(location))


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
