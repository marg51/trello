import React from 'react'
import {connect} from 'react-redux'
import Card from '../card'
import Trello from '../../lib/trello'
import { browserHistory } from 'react-router'
import Emoji from '../../utils/emoji'


function List({list, dispatch}) {
    let input;
    return (
        <div>

            <header className="list-header"><Emoji>{list.name}</Emoji></header>
            <div className="list-content">
                {list.cards.map(card =>
                    <div className="card" key={`card_${card}`} onClick={() => browserHistory.push(`/board/${list.idBoard}/card/${card}`)}><Card cardId={card}/></div>
                )}
             </div>
             <footer className="list-footer">add card</footer>
        </div>
    )
}

export default connect( (state, props) => ({list: state.entities.list.items[props.listId]}))(List)