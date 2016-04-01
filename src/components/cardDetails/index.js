import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import MemberCard from '../memberCard'
import If from '../../utils/if'
import Icon from '../../utils/icon'
import Marked from '../../utils/marked'
import Emoji from '../../utils/emoji'
import Action from '../action'

import Trello from '../../lib/trello'


class CardDetails extends Component {

    componentWillMount() {
        Trello.getCardAttachments(this.props.cardId)
        Trello.getCardChecklists(this.props.cardId)
        Trello.getCardActions(this.props.cardId)
    }

    render() {
        let {card, dispatch} = this.props
        return (
            <div>
                <header><h2><Emoji>{card.name}</Emoji></h2></header>

                <div>
                    <div>
                        <If test={card.labels.length}>
                            <span className="_color_02">Labels</span>
                            <div>{card.labels.map(e => <Label label={e} key={`label_${e.id}`}/>)}</div>
                        </If>
                        <div>
                            <div style={{margin: "30px 0", backgroundColor: "white", padding: "10px", borderRadius: "5px"}} className="paper">
                                <Marked text={card.desc}/>
                            </div>

                            Checklist: {card.checklists.length}<br />
                            <If test={card.checklists.length}>
                                {card.checklists.map(checklist =>
                                    <div>
                                        <h3><Icon icon="check-square-o"/><Emoji>{checklist.name}</Emoji></h3>
                                            {checklist.checkItems.map(item =>
                                                <div>
                                                    <If test={item.state == 'incomplete'}>
                                                        <Icon icon="circle-o"/>
                                                    </If>
                                                    <If test={item.state != 'incomplete'}>
                                                        <Icon icon="check-circle-o"/>
                                                    </If>
                                                    {' '}
                                                    <Emoji>{item.name}</Emoji>
                                                </div>
                                            )}
                                        </div>
                                )}
                            </If>


                            <If test={card.attachments.length}>
                                <ul>
                                    {card.attachments.map(attachment => <li key={`action_${attachment.id}`}><MemberCard memberId={attachment.idMember}/> <img src={attachment.previews[1].url} style={{width:attachment.previews[1].width+'px', height:attachment.previews[1].height+'px'}} className="paper-2"/></li>)}
                                </ul>
                            </If>

                            <If test={card.actions.length}>
                                {card.actions.map(action => <div style={{marginTop: "20px"}}  key={`action_${action.id}`}><Action action={action}/></div>)}
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