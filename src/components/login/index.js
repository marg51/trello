import React, { Component } from 'react';
import {connect} from 'react-redux'
import Trello from '../../lib/trello'

function Login({dispatch}) {
    function login() {
        Trello.login().then(() => {
            dispatch({type: 'login'})
            Trello.getBoards()
        }, () => {
            alert('error')
        })
    }
    login()
    return (
      <div style={{height: "100vh", lineHeight: "100vh", textAlign: "center"}}>
        <button onClick={login} style={{background: "linear-gradient(to bottom, #5aac44 0, #519839 100%)", color: "#fff", boxShadow: "0 2px 0 #3f6f21", border: "1px solid #3f6f21", cursor: "pointer", borderRadius: "5px", padding: "20px", fontSize: "2em"}}><i className="fa fa-trello"/> Please login to trello</button>
      </div>
    );
}

export default connect((state) => ({state}))(Login)