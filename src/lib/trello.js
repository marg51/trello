import {store} from '../'

const cache = {}
const decorate = (endpoint, callback) =>  {

    if(!cache[endpoint]) {
        cache[endpoint] =  new Promise((resolve, reject) => {
            Trello.get(endpoint, (data) => {
                callback(data)
                resolve(data)
            }, reject)
        })
    }

    return cache[endpoint]
}

export default {
    login: () =>
        new Promise((resolve, reject) => {
            Trello.authorize({
                type: "popup",
                name: "Getting Started Application",
                scope: {
                    read: true,
                    write: true },
                expiration: "never",
                success: () => resolve(),
                error: () => reject()
            });
        }),

    getBoards: () => decorate('/members/me/boards', data => {
        data.map(board => {
            board.lists = []
            store.dispatch({type: 'BOARD:CREATE', object: board})
        })
    }),
    getBoard: (boardId) => decorate(`/boards/${boardId}`, board => {
        board.lists = []
        store.dispatch({type: 'BOARD:CREATE', object: board})
    }),
    getBoardLists: (boardId) => decorate(`/boards/${boardId}/lists`, (data) => {
        data.map(list => {
            list.cards = []
            store.dispatch({type: 'LIST:CREATE', object: list})
            store.dispatch({type: 'BOARD:PUSH', id:boardId, field: "lists", value: list.id})
        })

    }),
    getListCards: (listId) => decorate(`/lists/${listId}/cards`, (data) => {
        data.map(card => {
            store.dispatch({type: 'CARD:CREATE', object: card})
            store.dispatch({type: 'LIST:PUSH', id:listId, field: "cards", value: card.id})
        })
    })
}