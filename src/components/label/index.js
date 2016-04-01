import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Emoji from '../../utils/emoji'

function Label({label, dispatch}) {
    return (
        <span style={{background: label.color, color: "white", padding: "2px 5px", fontSize: '9px', minWidth: '5px', marginRight: '3px', borderRadius: '3px', display: 'inline-block', verticalAlign: 'top', minHeight: '10px', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)'}}><Emoji>{label.name}</Emoji></span>
    )
}

export default connect( (state, props) => ({state}))(Label)