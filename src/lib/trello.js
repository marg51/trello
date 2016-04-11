import {store} from '../'
import WS from './ws-trello'

const cache = {}
const decorate = (endpoint, callback) =>  {

    // mock
    // return new Promise(resolve => resolve())

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


var ws;
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
                success: () => {
                    if(!ws)
                        ws = WS(localStorage.getItem("trello_token")+'&key=05d910022daa0558e1ada897808482b2', [data => console.log(data)])

                    return resolve()
                },
                error: () => reject()
            });
        }),

    getMember: () => decorate('/members/me/', () => {}),
    getBoards: () => decorate('/members/me/boards', data => {
        data.map(board => {
            board.lists = []
            board.members = []
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
    getBoardMembers: (boardId) => decorate(`/boards/${boardId}/members?fields=fullName,username,avatarHash,initials`, (data) => {
        data.map(list => {
            list.cards = []
            store.dispatch({type: 'MEMBER:CREATE', object: list})
            store.dispatch({type: 'BOARD:PUSH', id:boardId, field: "members", value: list.id})
        })

    }),
    getListCards: (listId) => decorate(`/lists/${listId}/cards`, (data) => {
        data.map(card => {
            card.checklists = []
            card.attachments = []
            card.actions = []
            store.dispatch({type: 'CARD:CREATE', object: card})
            store.dispatch({type: 'LIST:PUSH', id:listId, field: "cards", value: card.id})
        })
    }),
    getCardAttachments: (cardId) => decorate(`/cards/${cardId}/attachments`, (data) => {
        data.map(attachment => {
            store.dispatch({type: 'ATTACHMENT:CREATE', object: attachment})
            store.dispatch({type: 'CARD:PUSH', id:cardId, field: "attachments", value: attachment.id})
        })
    }),
    getCardChecklists: (cardId) => decorate(`/cards/${cardId}/checklists`, (data) => {
        data.map(checklist => {
            store.dispatch({type: 'CHECKLIST:CREATE', object: checklist})
            store.dispatch({type: 'CARD:PUSH', id:cardId, field: "checklists", value: checklist.id})
        })
    }),
    getCardActions: (cardId) => decorate(`/cards/${cardId}/actions?filter=all`/*addAttachmentToCard,commentCard`*/, (data) => {
        data.map(action => {
            store.dispatch({type: 'ACTION:CREATE', object: action})
            store.dispatch({type: 'CARD:PUSH', id:cardId, field: "actions", value: action.id})
        })
    }),
    getWs() {
        return ws;
    }
}