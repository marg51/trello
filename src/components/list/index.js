import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Card from '../card'
import Trello from '../../lib/trello'


function List({list, dispatch}) {
    let input;
    return (
        <div>

            <h3>{list.name}</h3>
            <div className="list-content">
                {list.cards.map(card =>
                    <div key={`card_${card}`} className="card"><Card cardId={card}/></div>
                )}
             </div>
        </div>
    )
}

export default connect( (state, props) => ({list: state.entities.list.items[props.listId]}))(List)