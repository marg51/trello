function actionsCreatorFactory(prefix) {
    return {
        create(object) {
            if(typeof object.id == "undefined") {
                throw new Error('object.id is required')
            }

            return {
                type: prefix+'CREATE',
                object
            }
        },
        remove(id) {
            if(typeof id == "undefined") {
                throw new Error('id is required')
            }

            return {
                type: prefix+'REMOVE',
                id
            }
        },
        update(id, object) {
            if(typeof id == "undefined") {
                throw new Error('id is required')
            }

            return {
                type: prefix+'UPDATE',
                id,
                object
            }
        }
    }
}

export default {
    checklist:      actionsCreatorFactory("CHECKLIST:"),
    card:           actionsCreatorFactory("CARD:"),
    label:          actionsCreatorFactory("LABEL:"),
    board:          actionsCreatorFactory("BOARD:"),
    action:         actionsCreatorFactory("ACTION:"),
    list:           actionsCreatorFactory("LIST:"),
    member:         actionsCreatorFactory("MEMBER:"),
    notification:   actionsCreatorFactory("NOTIFICATION:")
}