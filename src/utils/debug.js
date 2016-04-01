import React from 'react'

function Icon(props) {

    return (<span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => {window.$0 = props.object; console.log(props.object)}}>{ props.children }</span>)

}

export default Icon