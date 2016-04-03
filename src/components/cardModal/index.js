import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import Modal from 'react-modal'

import CardDetails from '../cardDetails'
const style = {
  overlay : {
    zIndex            : 2,
    backgroundColor   : 'rgba(0,0,0,.6)',
    overflow: "auto"
  }, content: {
      maxWidth: "700px",
      margin: "auto",
      borderWidth: 0,
      bottom: null,
      marginBottom: "40px",
      backgroundColor: "#F1F1F1"
  }
}

export default function CardModal({params}) {
    return (
        <Modal
            isOpen={true}
            onRequestClose={() => browserHistory.push(`/board/${params.boardId}/`)}
            style={style}
            >
                <CardDetails cardId={params.cardId}/>
            </Modal>
    )
}