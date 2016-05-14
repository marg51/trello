import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import MemberCard from '../memberCard'
import If from '../../utils/if'
import Icon from '../../utils/icon'
import Emoji from '../../utils/emoji'
import {decorateTitle} from './helper'

class Card extends Component {
    shouldComponentUpdate(newProps, newState) {
        if(newProps.card == this.props.card) {
            console.count("prevented update")
        }
        return newProps.card != this.props.card
    }
    render() {
        let input;
        let {card, dispatch, state} = this.props

        card = decorateTitle(card, state)

        return (
            <div>
                <div>
                    {card.labels.map(e => <Label label={e} key={`label_${e.id}`}/>)}
                </div>
                <Emoji>{card.name}</Emoji>
                <div>
                    <If test={card.badges.description}>
                        <Icon icon="align-left"/>
                    </If>
                    <If test={card.badges.comments}>
                        <Icon icon="comments-o">{card.badges.comments}</Icon>
                    </If>
                    <If test={card.badges.attachments}>
                        <Icon icon="paperclip">{card.badges.attachments}</Icon>
                    </If>

                    <If test={card.badges.checkItems}>
                        <Icon icon="check-square-o">{card.badges.checkItemsChecked}/{card.badges.checkItems}</Icon>
                    </If>
                    <If test={card.badges.size}>
                        <u>{card.badges.size}</u>
                    </If>
                    <If test={moment(card.dateLastActivity).diff() > -300000}>
                        <small className="_color_02"><Icon icon="pencil"/> {moment(card.dateLastActivity).fromNow()}</small>
                    </If>

                    <span style={{float: "right"}}>
                        {card.idMembers.map(member =>
                            <MemberCard memberId={member} key={`member_${member}`}/>
                        )}
                    </span>
                </div>
            </div>
        )
    }
}

export default connect( (state, props) => ({card: state.entities.card.items[props.cardId], state}))(Card)
