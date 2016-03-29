import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import Label from '../label'
import MemberCard from '../memberCard'
import If from '../../utils/if'
import Icon from '../../utils/icon'


function Action({action, dispatch}) {
    return (
        <div>
            <MemberCard memberId={action.idMemberCreator}/>
            {' '}
            <If test={action.type == "commentCard"}>
                {action.data.text}
            </If>
            <If test={action.type == "addAttachmentToCard"}>
                <pre>{JSON.stringify(action, null, 4)}</pre>
            </If>
        </div>
    )
}

export default connect( (state, props) => ({state}))(Action)