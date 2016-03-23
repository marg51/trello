import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import List from '../list'
import Trello from '../../lib/trello'


class Board extends Component {
    componentWillMount() {
        Trello.getBoard(this.props.params.boardId).then(() =>
            Trello.getBoardLists(this.props.params.boardId)
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


    shouldComponentUpdate(newProps, newState) {
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

        if(!board || !this.state || !this.state.isReady) {
            return (<div>Loading board</div>)
        }

        return (
            <div className="board">
                <h1>{board.name}</h1>
                {board.lists.map(list =>
                    <div key={`list_${list}`} className="list"><List listId={list}/></div>
                )}
            </div>
        )
    }
}

export default connect( (state) => ({boards: state.entities.board.items}))(Board)