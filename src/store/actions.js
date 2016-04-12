function actionsCreatorFactory(prefix, {decorator= data => data} = {}) {
    return {
        create(object) {
            if(typeof object.id == "undefined") {
                throw new Error('object.id is required')
            }

            return {
                type: prefix+'CREATE',
                object: decorator(object)
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
                object: decorator(object)
            }
        },
        pop(id, {field, index}) {
            if(typeof id == "undefined") {
                throw new Error('id is required')
            }
            if(typeof field == "undefined") {
                throw new Error('field is required')
            }
            if(typeof index == "undefined") {
                throw new Error('index is required')
            }

            return {
                type: prefix+'POP',
                id,
                field,
                index
            }
        },
        popValue(id, {field, value}) {
            if(typeof id == "undefined") {
                throw new Error('id is required')
            }
            if(typeof field == "undefined") {
                throw new Error('field is required')
            }
            if(typeof value == "undefined") {
                throw new Error('value is required')
            }

            return {
                type: prefix+'POPVAL',
                id,
                field,
                value
            }
        },
        push(id, {field, value}) {
            if(typeof id == "undefined") {
                throw new Error('id is required')
            }
            if(typeof field == "undefined") {
                throw new Error('field is required')
            }
            if(typeof value == "undefined") {
                throw new Error('value is required')
            }

            return {
                type: prefix+'PUSH',
                id,
                field,
                value
            }
        }
    }
}

export default {
    checklist:      actionsCreatorFactory("CHECKLIST:"),
    card:           actionsCreatorFactory("CARD:", {decorator: data => {data.slug = "1";return data}}),
    label:          actionsCreatorFactory("LABEL:"),
    board:          actionsCreatorFactory("BOARD:", {decorator: data => {if(!data.lists)data.lists = [];if(!data.members)data.members=[];return data}}),
    action:         actionsCreatorFactory("ACTION:"),
    list:           actionsCreatorFactory("LIST:"),
    member:         actionsCreatorFactory("MEMBER:"),
    notification:   actionsCreatorFactory("NOTIFICATION:")
}