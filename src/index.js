// import React from 'react';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import App from './components/app';
import BoardList from './components/boardList';
import Board from './components/board';
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


import {reducers} from './store/reducers'

console.log(reducers)
export const store = createStore(
  combineReducers({
    entities: reducers,
    user: (state = {isLoggedIn:false}, action) => {
        if(action.type == "login")
            return {isLoggedIn: true}

        return state
    },
    routing: routerReducer
  }),
  {},
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => console.log(location))

import actions from './store/actions'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="boards" component={BoardList}/>
            <Route path="board/:boardId" component={Board}/>
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
