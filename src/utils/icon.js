import React from 'react'

function Icon(props) {

    return (<span style={{fontSize: "0.7em", color: "#999", marginRight: "5px"}} {...props}><i className={`fa fa-${props.icon}`}></i> {props.children}</span>)

}

export default Icon
