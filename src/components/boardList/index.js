import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'


function BoardList({boardsId,boards, select}) {
    return (
        <div>
        <ul>
        {
            boardsId.map(e =>
                <li><Link to={`/board/${e}`}>{boards[e].name}</Link></li>
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

export default connect(state => ({boardsId: state.app.boardsId, boards: state.app.boards}), {select})(BoardList)