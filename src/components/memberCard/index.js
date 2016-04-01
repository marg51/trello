import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import If from '../../utils/if'
import Icon from '../../utils/icon'

function MemberCard({member, dispatch}) {
    return (
        <span>
            <If test={member.avatarHash}>
                <img className="member-avatar" height="30" width="30" src={`https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/30.png`} srcSet={`https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/30.png 1x, https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/50.png 2x`} alt={`${member.fullName} (${member.username})`} title={`${member.fullName} (${member.username})`} style={{borderRadius: "5px"}}/>
            </If>
            <If test={!member.avatarHash}>
                <span title={`${member.fullName} (${member.username})`} style={{display: "inline-block", height: "30px", width: "30px", background: "#DDD", borderRadius: "3px", textAlign: "center", lineHeight: "30px"}}>
                    {member.initials}
                </span>
            </If>
        </span>
    )
}

export default connect( (state, props) => ({member: state.entities.member.items[props.memberId]}))(MemberCard)