import React, {Component} from 'react'
import {connect} from 'react-redux'

import actions from '../../store/actions'

import DropCardHere from "./dropCardHere"
import {DragSource, DropTarget} from "react-dnd"

import { getEmptyImage } from 'react-dnd-html5-backend';

import Card from "./index"

const style = {
    border: "2px dashed gray",
    "marginBottom": "5px",
    opacity: 0.3
}

@DragSource("card",
    {beginDrag(props) { return {id: props.cardId, listId: props.listId}}},
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    })
)
@DropTarget("card",
    {
        drop(props, monitor) {
         const {dispatch, listId: ownListId} = props
         const list = props.state.entities.list.items[ownListId].cards
         let listIndex = list.indexOf(props.cardId)

         const {id, listId} = monitor.getItem()

         if(listId === ownListId) {
             if( list.indexOf(id) < listIndex) listIndex--
         }

         dispatch(actions.list.popValue(listId, {field: "cards", value: id}))
         dispatch(actions.list.push(ownListId, {field: "cards", value: id, index: listIndex}))
    }}, (connect, monitor) => ({connectDropTarget: connect.dropTarget(), isOver: monitor.isOver(), monitor})
)
class DraggableCard extends Component {
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
        let {isOver, connectDropTarget, connectDragSource, isDragging} = this.props

        if(isOver && this.props.monitor.getItem().id == this.props.cardId) {
            isOver = false
        }
        const dropCard = isOver?<DropCardHere/>:""

        return connectDropTarget(connectDragSource(
            <div>
                {dropCard}
                <div style={{opacity: isDragging?"0.3":1}}>
                    <Card cardId={this.props.cardId} listId={this.props.listId}/>
                </div>
            </div>
        ))
    }
}

export default connect( (state, props) => ({card: state.entities.card.items[props.cardId], state}))(DraggableCard)
