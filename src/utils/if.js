import React from 'react'

function If(props) {

    if(props.test && props.children.bind) {
        return (<span>{props.children()}</span>)
    }

    if(props.test) {
        return (<span>{props.children}</span>)
    }

    return (<span/>)

}

export default If