import React from 'react'
import emojify from 'emojify.js'


emojify.setConfig({ignore_emoticons: true, img_dir: 'http://hassankhan.me/emojify.js/images/emoji'})
window.emojify = emojify
function Emoji({children, ...props}) {

    const formated = emojify.replace(children)

    return (<span dangerouslySetInnerHTML={{__html: formated}} {...props}/>)

}

export default Emoji