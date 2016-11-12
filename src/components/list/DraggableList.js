import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from '../card'
import Trello from '../../lib/trello'
import { browserHistory } from 'react-router'
import Emoji from '../../utils/emoji'
import actions from '../../store/actions'

import { getEmptyImage } from 'react-dnd-html5-backend';

import {DropTarget, DragSource} from "react-dnd"

import DraggableCard from "../card/draggableCard"

import DropCardHere from "../card/dropCardHere"

import List from "./index"

@DragSource("list", {
    beginDrag(props) {
        return {id: props.listId, boardId: props.boardId}
    }
}, (connect, monitor) => ({
   connectDragSource: connect.dragSource(),
   connectDragPreview: connect.dragPreview(),
}))
@DropTarget("list", {
    drop(props, monitor) {
        const {id, boardId} = monitor.getItem()
        const {dispatch, boardId: ownBoardId, listId: ownId} = props

        const listIndex = props.boards[ownBoardId].lists.indexOf(ownId)

        dispatch(actions.board.popValue(boardId, {field: "lists", value: id}))
        dispatch(actions.board.push(ownBoardId, {field: "lists", value: id, index: listIndex}))
    }
}, (connect, monitor) => ({connectDropTarget: connect.dropTarget(), isOver: monitor.isOver({ shallow: true })}))
class DraggableList extends Component {
    componentDidMount() {
        // Use empty image as a drag preview so browsers don't draw it
        // and we can draw whatever we want on the custom drag layer instead.
        this.props.connectDragPreview(getEmptyImage(), {
            // IE fallback: specify that we'd rather screenshot the node
            // when it already knows it's being dragged so we can hide it with CSS.
            captureDraggingState: true
        });
    }
    render() {
        const {list, cards, dispatch, connectDropTarget,  connectDragSource, isOver} = this.props
        let input;

        const dropCard = isOver?<DropCardHere/>:""

        return connectDragSource(connectDropTarget(
            <div className={isOver?"list-dragover":""}>
                <List {...this.props}/>
            </div>
        ))
    }
}

export default connect( (state, props) => ({list: state.entities.list.items[props.listId], cards: state.entities.card.items, boards: state.entities.board.items}))(DraggableList)