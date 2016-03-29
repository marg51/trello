import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import MemberCard from '../memberCard'
import If from '../../utils/if'
import Icon from '../../utils/icon'
import Action from '../action'

import Trello from '../../lib/trello'


class CardDetails extends Component {

    componentWillMount() {
        Trello.getCardAttachments(this.props.card.id)
        Trello.getCardChecklists(this.props.card.id)
        Trello.getCardActions(this.props.card.id)
    }

    render() {
        let {card, dispatch} = this.props
        return (
            <div>
                <header><h1>{card.name}</h1></header>

                <div>
                    <div>
                        <If test={card.labels.length}>
                            <span className="_color_02">Labels</span>
                            <div>{card.labels.map(e => <Label label={e} key={`label_${e.id}`}/>)}</div>
                        </If>
                        <div>
                            <div style={{marginTop: "50px", whiteSpace: "pre-wrap"}}>
                                <span className="_color_02">Description</span>
                                <p>{card.desc}</p>
                            </div>

                            Checklist: {card.checklists.length}<br />
                            <If test={card.checklists.length}>
                                {card.checklists.map(checklist =>
                                    <div>
                                        <h3><Icon icon="check-square-o"/> {checklist.name}</h3>
                                            {checklist.checkItems.map(item =>
                                                <div>
                                                    <If test={item.state == 'incomplete'}>
                                                        <Icon icon="circle-o"/>
                                                    </If>
                                                    <If test={item.state != 'incomplete'}>
                                                        <Icon icon="check-circle-o"/>
                                                    </If>
                                                    {' '}
                                                    {item.name}
                                                </div>
                                            )}
                                        </div>
                                )}
                            </If>


                            <If test={card.attachments.length}>
                                <ul>
                                    {card.attachments.map(attachment => <li key={`action_${attachment.id}`}><MemberCard memberId={attachment.idMember}/> <img src={attachment.previews[1].url} style={{width:attachment.previews[1].width+'px', height:attachment.previews[1].height+'px'}} /></li>)}
                                </ul>
                            </If>

                            <If test={card.actions.length}>
                                {card.actions.map(action => <Action action={action} key={`action_${action.id}`}/>)}
                            </If>

                            <span style={{float: "right"}}>
                                {card.idMembers.map(member =>
                                    <MemberCard memberId={member} key={`member_${member}`}/>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect( (state, props) => ({card: state.entities.card.items[props.cardId]}))(CardDetails)