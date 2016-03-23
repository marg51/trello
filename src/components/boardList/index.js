import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'


function BoardList({boardsId,boards, select}) {
    return (
        <div>
        <ul>
        {
            boardsId.map(e =>
                <li key={`board_${e}`} ><Link to={`/board/${e}`}>{boards[e].name}</Link></li>
            )
        }
        </ul>
        </div>
    )
}

function select(id) {
    return {
        type: 'select',
        id
    }
}

export default connect(state => ({boardsId: state.entities.board.ids, boards: state.entities.board.items}), {select})(BoardList)