import React from 'react'
import Icon from "./icon"

const wm = new Map()


function Link({link}) {
    if(wm.has(link))
        return wm.get(link)

    const metadata = getMeta(link)

    const template = (<span><Icon icon={metadata.icon}/><a href={link}>{metadata.human}</a></span>)

    wm.set(link, template)

    return template

}

function getMeta(link) {
    if(link.match(/trello.com/)) {
        const state = __store.getState()
        const result = link.match(/.*\/([0-9]+)-([^/]*)$/)
        if(state.entities.card.idShorts[result[1]])
            var human = state.entities.card.items[state.entities.card.idShorts[result[1]]].name
        else human = result[2]
        return {
            icon: "trello",
            link,
            human
        }
    }

    if(link.match(/invisionapp.com/)) {
        return {
            icon: "linkedin",
            human: "Invision"
        }
    }

    if(link.match(/github.com/)) {
        return {
            icon: "github",
            human: link.replace(/.*github.com\/([a-z_-]*)\/([a-z_-]*)(\/(.*))?$/, "$1/$2 $4")
        }
    }
}

export default Link
