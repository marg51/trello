import React from 'react'

function Icon(props) {

    return (<span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => console.log(props.object)}>{ props.children }</span>)

}

export default Icon