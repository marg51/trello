import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Card from '../card'
import Trello from '../../lib/trello'


function List({list, dispatch}) {
    let input;
    return (
        <div>

            <header className="list-header">{list.name}</header>
            <div className="list-content">
                {list.cards.map(card =>
                    <div key={`card_${card}`} className="card"><Card cardId={card}/></div>
                )}
             </div>
             <footer className="list-footer">add card</footer>
        </div>
    )
}

export default connect( (state, props) => ({list: state.entities.list.items[props.listId]}))(List)