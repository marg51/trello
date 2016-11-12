import React, {Component} from 'react'
import Card from "./index"

const style = {
    height: "38px",
    border: "2px dashed gray",
    "marginBottom": "5px",
    opacity: 0.3
}
export default class DropCardHere extends Component {
    render() {
        return <div style={style}/>
    }
}

