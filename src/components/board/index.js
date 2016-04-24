import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import List from '../list'
import Trello from '../../lib/trello'
import Loader from 'react-loaders'
import Emoji from '../../utils/emoji'
import Debug from '../../utils/debug'


class Board extends Component {
    componentWillMount() {
        Trello.getWs().listenTo("board", this.props.params.boardId)

        Trello.getBoard(this.props.params.boardId).then(() =>
            // we don't wait for members
            Promise.all([
                Trello.getBoardMembers(this.props.params.boardId),
                Trello.getBoardLists(this.props.params.boardId)
            ])
        ).then(results =>
            results[1]
        ).then(lists =>
            Promise.all(lists.map(list =>
                Trello.getListCards(list.id)
            ))
        ).then(() => {
            this.setState({isReady: true})
        }).catch(() => {
            this.setState({hasError: true})
        })
    }


    ___shouldComponentUpdate(newProps, newState) {
        if(newProps.params.boardId != this.props.params.boardId) {
            console.log('new board')
            return true
        }
        if(
            (newState && newState.isReady)
            ||
            (this.state && this.state.isReady && this.props.boards[this.props.params.boardId] !== newProps.boards[this.props.params.boardId])
        ) {
            console.log("update")
            return true
        }
        console.log("prevented update")

        return false
    }

    render() {
        const board = this.props.boards[this.props.params.boardId]
        const lists = this.props.lists

        // if(false){ // !board || !this.state || !this.state.isReady) {
        if(!board || !this.state || !this.state.isReady) {
            return (
                <div style={{height: "calc(100vh - 18px)", display: "flex", alignItems: "center",justifyContent: "center", backgroundColor: "rgb(0, 121, 191)"}}>
                    <span style={{transform: "scale(1.3)"}}><Loader type="ball-clip-rotate-multiple" style={{width: "100px",height: "100px",lineHeight: "100px",margin: "auto",marginTop: "45vh"}}>Loading board</Loader></span>
                </div>)
        }

        return (
            <div className="board" style={{height: "calc(100vh - 38px)", background: board.prefs.backgroundColor, color: (board.prefs.backgroundBrightness == "dark")?'white':'black'}}>
                <h1><Emoji>{board.name}</Emoji> <Debug object={board}>*</Debug></h1>
                {_(board.lists).map(listId => lists[listId]).sortBy('pos').map(list =>
                    <div key={`list_${list.id}`} className="list"><List listId={list.id}/></div>
                ).value()}
                {this.props.children}
            </div>
        )
    }
}

function BoardContainer(props) {
    return (<div><Board key={`board_${props.boardId}`} {...props}/></div>)
}

export default connect( (state, props) => ({boardId: props.params.boardId, boards: state.entities.board.items, lists: state.entities.list.items}))(BoardContainer)
