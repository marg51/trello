import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'


function Card({card, dispatch}) {
    let input;
    return (
        <span>{card.name}</span>
    )
}

export default connect( (state, props) => ({card: state.entities.card.items[props.cardId]}))(Card)