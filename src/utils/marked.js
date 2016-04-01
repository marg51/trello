import React from 'react'
import marked from 'marked'
import emojify from 'emojify.js'
emojify.setConfig({ignore_emoticons: true, img_dir: 'http://hassankhan.me/emojify.js/images/emoji'})


window.marked = marked
function Marked({text, ...props}) {

    const formated = marked(emojify.replace(text))

    return (<div dangerouslySetInnerHTML={{__html: formated}} {...props}/>)

}

export default Marked