import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from '../card'
import Trello from '../../lib/trello'
import { browserHistory } from 'react-router'
import Emoji from '../../utils/emoji'
import actions from '../../store/actions'

import {DropTarget, DragSource} from "react-dnd"

import DraggableCard from "../card/draggableCard"

import DropCardHere from "../card/dropCardHere"

@DropTarget("card", { drop(props, monitor) {
        if(monitor.didDrop()) return

         const {id, listId} = monitor.getItem()
         const {dispatch, list: {id: ownListId}} = props
         dispatch(actions.list.popValue(listId, {field: "cards", value: id}))
         dispatch(actions.list.push(ownListId, {field: "cards", value: id}))
    }}, (connect, monitor) => ({connectDropTarget: connect.dropTarget(), isOver: monitor.isOver({ shallow: true })}))
class List extends Component {
    render() {
        const {list, cards, dispatch, connectDropTarget, isOver} = this.props
        let input;

        const dropCard = isOver?<DropCardHere/>:""

        return connectDropTarget(
            <div className="list-element">

                <header className="list-header"><Emoji>{list.name}</Emoji></header>
                <div className="list-content">
                    {_(list.cards).map(cardId => cards[cardId]).map(card =>
                        <div key={`card_${card.id}`} onClick={() => browserHistory.push(`/board/${list.idBoard}/card/${card.id}`)}><DraggableCard cardId={card.id} listId={list.id}/></div>
                    ).value()}
                    {dropCard}
                </div>

                <footer className="list-footer">add card</footer>
            </div>
        )
    }
}

export default connect( (state, props) => ({list: state.entities.list.items[props.listId], cards: state.entities.card.items, boards: state.entities.board.items}))(List)