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
    return (
        <div>
            <span style={{float: "left", marginRight: "10px"}}>
                <MemberCard memberId={action.idMemberCreator}/>
            </span>
            {' '}
            <b>{member.fullName}</b> - <Debug object={action}>{action.type}</Debug>
            <br />
            <div style={{marginLeft: "40px"}}>
                <If test={action.type == "commentCard"}>
                    <Marked text={action.data.text} className="paper" style={{background: "white", padding: "10px", borderRadius: "3px"}}/>
                </If>
                <If test={action.type == "addAttachmentToCard"}>
                    <If test={action.data.attachment && action.data.attachment.previewUrl}>
                        {() => (<img src={action.data.attachment.previewUrl} style={{maxWidth: "660px"}} className="paper-2"/>)}
                    </If>
                    <If test={!(action.data.attachment && action.data.attachment.previewUrl)}>
                        <em> Deleted attachment</em>
                    </If>
                </If>

                <If test={action.type == "addMemberToCard"}>
                    {() => (<span><MemberCard memberId={action.data.idMember}/> Joined</span>)}
                </If>
                <If test={action.type == "removeMemberFromCard"}>
                    {() => (<span><MemberCard memberId={action.data.idMember}/> Left</span>)}
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
                    </span>)}
                </If>
                <small className="_color_02"><Moment date={action.date} method="fromNow"/> <Moment date={action.date}/></small>
            </div>
        </div>
    )
}

export default connect( (state, props) => ({member: state.entities.member.items[props.action.idMemberCreator]}))(Action)