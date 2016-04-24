import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import MemberCard from '../memberCard'
import If from '../../utils/if'
import Moment from '../../utils/moment'
import Icon from '../../utils/icon'
import Debug from '../../utils/debug'
import Marked from '../../utils/marked'
import Emoji from '../../utils/emoji'



function Action({action, member, dispatch}) {
    const memberName = <b>{member.fullName}</b>

    return (
        <div>
            <span style={{float: "left", marginRight: "10px"}}>
                <MemberCard memberId={action.idMemberCreator}/>
            </span>
            {' '}
            <div style={{marginLeft: "40px"}}>
                <If test={action.type == "commentCard"}>
                    {memberName} <br />
                    <Marked text={action.data.text} className="paper" style={{background: "white", padding: "10px", borderRadius: "3px"}}/>
                </If>
                <If test={action.type == "addAttachmentToCard"}>
                    <If test={action.data.attachment && action.data.attachment.previewUrl}>
                        {() => (<span>{memberName} attached <a href={action.data.attachment.url}>{action.data.attachment.name}</a><br /><img src={action.data.attachment.previewUrl} style={{maxWidth: "660px"}} className="paper-2"/></span>)}
                    </If>
                    <If test={!(action.data.attachment && action.data.attachment.previewUrl)}>
                        {memberName}<em> Deleted attachment</em>
                    </If>
                </If>

                <If test={action.type == "addMemberToCard" && action.data.idMember == member.id}>
                    {() => (<span>{memberName} joined this card</span>)}
                </If>
                <If test={action.type == "addMemberToCard" && action.data.idMember != member.id}>
                    {() => (<span>{memberName} added <MemberCard memberId={action.data.idMember}/> to card</span>)}
                </If>
                <If test={action.type == "removeMemberFromCard" && action.data.idMember == member.id}>
                    {() => (<span>{memberName} left card</span>)}
                </If>
                <If test={action.type == "removeMemberFromCard" && action.data.idMember != member.id}>
                    {() => (<span>{memberName} removed <MemberCard memberId={action.data.idMember}/> from card</span>)}
                </If>
                <If test={action.type == "createCard"}>
                    {() => (<div className="_color_02">added this card to <small>{action.data.list.name}</small></div>)}
                </If>
                <If test={action.type == "updateCard"}>
                    {() => (<span>
                        <If test={action.data.listBefore}>
                            {() => (<em>Moved from <small>{action.data.listBefore.name}</small> to <small>{action.data.listAfter.name}</small></em>)}
                        </If>
                        <If test={action.data.old && action.data.old.pos}>
                            {() => (<em>Moved card {(() => ((action.data.old.pos > action.data.card.pos)?"up":"down"))()}</em>)}
                        </If>
                        {action.data.old && Object.keys(action.data.old)}
                    </span>)}
                </If>
                <br />
                <small className="_color_02"><Moment date={action.date} method="fromNow"/> <Moment date={action.date}/></small> <Debug object={action}>{action.type}</Debug>
            </div>
        </div>
    )
}

export default connect( (state, props) => ({member: state.entities.member.items[props.action.idMemberCreator]}))(Action)
