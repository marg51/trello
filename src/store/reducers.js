export default {
    app: (state = {isLoggedIn: false, boards: {1: {id:1, name: "Salut"}, 2: {id:2, name: "Hey"}}, boardsId: [1, 2]}, action) => {
        if(action.type == 'login') {
            return {
                ...state,
                isLoggedIn: true
            }
        }
        if(action.type == 'select') {
            return {
                ...state,
                selected: action.id
            }
        }

        return state
    }
}