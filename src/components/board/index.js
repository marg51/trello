import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'


function Board({board, select}) {
    return (
        <div>
            <Link to="/boards">Boards</Link>
            <h1>{board.name} (#{board.id})</h1>
        </div>
    )
}

export default connect( (state, props) => ({board: state.app.boards[props.params.boardId]}))(Board)