import {combineReducers} from 'redux'

function enhancer({PREFIX, INIT_STATE}, reducer) {
    return function enhancedReducer(state = {...INIT_STATE}, action) {
        switch(action.type) {
            case PREFIX+'CREATE':
                // don't add duplicates
                const ids = (state.ids.includes(action.object.id)) ? state.ids : [...state.ids, action.object.id]
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.object.id]: action.object
                    },
                    ids
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


            // this could be done using UPDATE but it's easier using pop
            case PREFIX+'POP':
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.id]: {
                            ...state.items[action.id],
                            [action.field]: state.items[action.id][action.field].filter((value, index) => index != action.index)
                        }
                    }
                }
            case PREFIX+'POPVAL':
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.id]: {
                            ...state.items[action.id],
                            [action.field]: state.items[action.id][action.field].filter((value) => value != action.value)
                        }
                    }
                }

            // this could be done using UPDATE but it's easier using push
            case PREFIX+'PUSH':
                // prevent doubles
                if(!state.items[action.id][action.field] || state.items[action.id][action.field].includes(action.value))
                    return state

                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.id]: {
                            ...state.items[action.id],
                            [action.field]: [...state.items[action.id][action.field], action.value]
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
    attachment:     enhancer({PREFIX: "ATTACHMENT:",     INIT_STATE}, emptyReducer),
    card:           enhancer({PREFIX: "CARD:",           INIT_STATE}, emptyReducer),
    label:          enhancer({PREFIX: "LABEL:",          INIT_STATE}, emptyReducer),
    board:          enhancer({PREFIX: "BOARD:",          INIT_STATE}, emptyReducer),
    action:         enhancer({PREFIX: "ACTION:",         INIT_STATE}, emptyReducer),
    list:           enhancer({PREFIX: "LIST:",           INIT_STATE}, emptyReducer),
    member:         enhancer({PREFIX: "MEMBER:",         INIT_STATE}, emptyReducer),
    notification:   enhancer({PREFIX: "NOTIFICATION:",   INIT_STATE}, emptyReducer)
})
