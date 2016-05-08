const wm = new WeakMap()

export function decorateTitle(card, state) {
        var result
        const original = card
        if(wm.has(card)) {
            console.count(`already has card ${card.id}`)
            return wm.get(card)
        }
        console.count(`no card ${card.id}`)

        if(result = card.name.match(/^\(([0-9]+)\) ?(.*)$/)) {
                card = {
                        ...card,
                        name: result[2],
                        badges: {
                                ...card.badges,
                                size: result[1]
                        },
                        links: []
                }
        } else {
            // to be sure we don't mutate it
            card = {...card, links: []}
        }

        card.actions
            .map(actionId => state.entities.action.items[actionId])
            .filter(action => action.type == "commentCard" && action.data.text)
            .map(action => {
                console.log(action)
                const result = action.data.text.match(/(https:\/\/(?:trello.com|projects.invisionapp.com)[^\s]+)/g)

                if(result) {
                    card.links.push(...result)
                }
            })

        wm.set(original, card)
        return card

}
