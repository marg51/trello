import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import MemberCard from '../memberCard'
import If from '../../utils/if'
import Icon from '../../utils/icon'
import Emoji from '../../utils/emoji'

function Card({card, dispatch}) {
    let input;
    return (
        <div>
            <div>{card.labels.map(e => <Label label={e} key={`label_${e.id}`}/>)}</div>
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

                <span style={{float: "right"}}>
                    {card.idMembers.map(member =>
                        <MemberCard memberId={member} key={`member_${member}`}/>
                    )}
                </span>
            </div>
        </div>
    )
}

export default connect( (state, props) => ({card: state.entities.card.items[props.cardId]}))(Card)