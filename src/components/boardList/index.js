import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Emoji from '../../utils/emoji'
import Debug from '../../utils/debug'


function getStyle(board) {
    return {
        padding: "20px",
        backgroundImage: "url("+board.prefs.backgroundImage+")",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundColor: board.prefs.backgroundColor,
        color: (board.prefs.backgroundBrightness == "dark")?'white':'black',
        width: "280px",
        height: "60px",
        float: "left",
        textShadow: "-1px -1px 3px rgba(0,0,0,0.3),1px 1px 0px rgba(0,0,0,0.5)",
        margin: "1px",
        borderRadius: "5px"
    }
}

function getStyle_a(board) {
    return {
        color: (board.prefs.backgroundBrightness == "dark")?'white':'black',
        textDecoration: "none",
    }
}


function BoardList({boardsId,boards, select}) {
    return (
        <div style={{padding: "10px 50px"}}>
        {
            _(boardsId)
                .map(boardId => boards[boardId])
                .groupBy('idOrganization')
                .map((e,i) =>
                    <div key={`orga_${i}`}>
                    {
                        e.map(board =>
                            <Link to={`/board/${board.id}/`}  style={getStyle_a(board)} key={`orga_board_${board.id}`}><div style={getStyle(board)}> <Emoji>{board.name}</Emoji></div></Link>
                        )
                    }
                    <div style={{clear: 'both', height: "20px"}}/>
                    </div>

                )
                .value()
        }
        </div>
    )
}

                    // <li key={`board_${e}`} ></li>

function select(id) {
    return {
        type: 'select',
        id
    }
}

export default connect(state => ({boardsId: state.entities.board.ids, boards: state.entities.board.items}), {select})(BoardList)