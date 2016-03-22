import {combineReducers} from 'redux'

function enhancer({PREFIX, INIT_STATE}, reducer) {
    return function enhancedReducer(state = {...INIT_STATE}, action) {
        switch(action.type) {
            case PREFIX+'CREATE':
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.object.id]: action.object
                    },
                    ids: [...state.ids, action.object.id]
                }
            case PREFIX+'DELETE':
                return {
                    ...state,
                    items: Object.keys(state.items, (newState, key) => {
                        if(action.id != key) {
                            newState[key] = state.items[key]
                        }

                        return newState
                    }, {}),
                    ids: state.ids.filter(id => id != action.id)
                }
            case PREFIX+'UPDATE':
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.id]: {
                            ...state.items[action.id],
                            ...action.object
                        }
                    }
                }
        }

        return reducer(state, action)
    }
}

const emptyReducer = (state, action) => state
const INIT_STATE = {
    items: {},
    ids: []
}

export const reducers = combineReducers({
    checklist:      enhancer({PREFIX: "CHECKLIST:",      INIT_STATE}, emptyReducer),
    card:           enhancer({PREFIX: "CARD:",           INIT_STATE}, emptyReducer),
    label:          enhancer({PREFIX: "LABEL:",          INIT_STATE}, emptyReducer),
    board:          enhancer({PREFIX: "BOARD:",          INIT_STATE}, emptyReducer),
    action:         enhancer({PREFIX: "ACTION:",         INIT_STATE}, emptyReducer),
    list:           enhancer({PREFIX: "LIST:",           INIT_STATE}, emptyReducer),
    member:         enhancer({PREFIX: "MEMBER:",         INIT_STATE}, emptyReducer),
    notification:   enhancer({PREFIX: "NOTIFICATION:",   INIT_STATE}, emptyReducer)
})
