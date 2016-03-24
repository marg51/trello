import React from 'react'

function If(props) {
    if(props.test) {
        return (<span>{props.children}</span>)
    }

    return (<span style={{display:"none"}}></span>)

}

export default If