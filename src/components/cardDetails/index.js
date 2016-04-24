import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import MemberCard from '../memberCard'
import If from '../../utils/if'
import Icon from '../../utils/icon'
import Marked from '../../utils/marked'
import Emoji from '../../utils/emoji'
import Debug from '../../utils/debug'
import Action from '../action'
import {decorateTitle} from '../card/helper'
import ProgressBar from '../../utils/progressBar'

import Trello from '../../lib/trello'


class CardDetails extends Component {

    componentWillMount() {
        Trello.getCardAttachments(this.props.cardId)
        Trello.getCardChecklists(this.props.cardId)
        Trello.getCardActions(this.props.cardId)
    }

    render() {
        let {card, actions, checklists, attachments, dispatch} = this.props

        console.count("renderCardDetails")
        card = decorateTitle(card)

        return (
            <div>
                <header><h2><Emoji>{card.name}</Emoji><Debug object={card}>*</Debug><a href={card.url}><Icon icon="trello"/></a><span style={{float: "right"}}>{card.badges.size}</span></h2></header>

                <div>
                    <div>
                        <If test={card.idMembers}>
                            <div style={{float: "left", marginRight: "10px"}}>
                                <span className="_color_02">Members</span>
                                <div>{card.idMembers.map(e => <MemberCard memberId={e} key={`member_${e}`}/>)}</div>
                             </div>
                        </If>
                        <If test={card.labels.length}>
                            <span className="_color_02">Labels</span>
                            <div>{card.labels.map(e => <Label label={e} key={`label_${e.id}`}/>)}</div>
                        </If>
                        <div>
                            <div style={{margin: "30px 0", backgroundColor: "white", padding: "10px", borderRadius: "5px"}} className="paper">
                                <Marked text={card.desc}/>
                            </div>
                            <If test={card.attachments.length}>
                                <h4><Icon icon="paperclip"/> Attachments</h4>
                                {card.attachments.map(id => attachments[id]).map(attachment =>
                                        <div key={`attachment_${attachment.id}`}><img src={attachment.previews[1].url}/><a href={attachment.url}>{attachment.name}</a></div>
                                )}
                            </If>
                            <If test={card.checklists.length}>
                                {card.checklists.map(id => checklists[id]).map(checklist =>
                                    <div key={`checklist_${checklist.id}`}>
                                        <h3><Icon icon="check-square-o"/><Emoji>{checklist.name}</Emoji></h3>
                                        <ProgressBar max={checklist.checkItems.length} current={checklist.checkItems.filter(item => item.state == 'complete').length}/>
                                            {checklist.checkItems.map(item =>
                                                <div key={`checkItem_${item.id}`}>
                                                    <If test={item.state == 'incomplete'}>
                                                        <Icon icon="circle-o"/>
                                                    </If>
                                                    <If test={item.state != 'incomplete'}>
                                                        <Icon icon="check-circle-o" style={{color: "green"}}/>
                                                    </If>
                                                    {' '}
                                                    <Emoji>{item.name}</Emoji>
                                                </div>
                                            )}
                                        </div>
                                )}
                            </If>


                            <If test={card.actions.length}>
                                {card.actions.map(id => actions[id]).map(action => <div style={{marginTop: "20px"}}  key={`action_${action.id}`}><Action action={action}/></div>)}
                            </If>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect( (state, props) => ({card: state.entities.card.items[props.cardId], actions: state.entities.action.items, checklists: state.entities.checklist.items, attachments: state.entities.attachment.items}))(CardDetails)



