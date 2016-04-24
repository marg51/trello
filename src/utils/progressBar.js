import React from 'react'
export default function (props) {
        return (<div className="progress-bar"><div className="progress-bar-inner" style={{width: Math.floor(props.current / props.max * 100)+"%"}}/></div>)
}
