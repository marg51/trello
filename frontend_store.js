var BoardsReducer = function(state = {}, action) {
    if(!action.boardId) return state;

    return {
        ...state,
        [action.boardId]: BoardReducer(state[action.boardId], action)
    }
}

var BoardReducer = Redux.combineReducers({
    board,
    columns,
    stories,
    tasks,
    labels
})

var Reducer = Redux.combineReducers({
    boards: BoardsReducer,
    user: UserReducer
})


createStore(Reducer, Redux.applyMiddleware(SocketMiddleware))
