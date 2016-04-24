export function decorateTitle(card) {
        var result
        if(result = card.name.match(/^\(([0-9]+)\) ?(.*)$/)) {
                return {
                        ...card,
                        name: result[2],
                        badges: {
                                ...card.badges,
                                size: result[1]
                        }
                }
        }
        return card

}
