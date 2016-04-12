import {store} from '../'
import WS from './ws-trello'
import actions from "../store/actions"

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
            store.dispatch(actions.board.create(board))
        })
    }),
    getBoard: (boardId) => decorate(`/boards/${boardId}`, board => {
        store.dispatch(actions.board.create(board))
    }),
    getBoardLists: (boardId) => decorate(`/boards/${boardId}/lists`, (data) => {
        data.map(list => {
            list.cards = []

            store.dispatch(actions.list.create(list))
            store.dispatch(actions.board.push(boardId, {field: "lists", value: list.id}))
        })

    }),
    getBoardMembers: (boardId) => decorate(`/boards/${boardId}/members?fields=fullName,username,avatarHash,initials`, (data) => {
        data.map(member => {
            member.cards = []

            store.dispatch(actions.member.create(member))
            store.dispatch(actions.board.push(boardId, {field: "members", value: member.id}))
        })

    }),
    getListCards: (listId) => decorate(`/lists/${listId}/cards`, (data) => {
        data.map(card => {
            card.checklists = []
            card.attachments = []
            card.actions = []
            store.dispatch(actions.card.create(card))
            store.dispatch(actions.list.push(listId, {field: "cards", value: card.id}))
        })
    }),
    getCardAttachments: (cardId) => decorate(`/cards/${cardId}/attachments`, (data) => {
        data.map(attachment => {
            store.dispatch(actions.attachment.create(attachment))
            store.dispatch(actions.card.push(cardId, {field: "attachments", value: attachment.id}))
        })
    }),
    getCardChecklists: (cardId) => decorate(`/cards/${cardId}/checklists`, (data) => {
        data.map(checklist => {
            store.dispatch(actions.checklist.create(checklist))
            store.dispatch(actions.card.push(cardId, {field: "checklists", value: checklist.id}))
        })
    }),
    getCardActions: (cardId) => decorate(`/cards/${cardId}/actions?filter=all`/*addAttachmentToCard,commentCard`*/, (data) => {
        data.map(action => {
            store.dispatch(actions.action.create(action))
            store.dispatch(actions.card.push(cardId, {field: "actions", value: action.id}))
        })
    }),
    getWs() {
        return ws;
    }
}