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


import reducers from './store/reducers'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  {},
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => console.log(location))


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
