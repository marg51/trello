import actions from '../store/actions'

export default function(state, dispatch, event) {
    console.log(event)
    if(event.event != "updateModels") {
        return
    }

    if(actions[event.typeName.toLowerCase()]) {
        let entity = state.entities[event.typeName.toLowerCase()].items[event.deltas[0].id]
        if(entity) {
            dispatch(actions[event.typeName.toLowerCase()].update(event.deltas[0].id, event.deltas[0]))

            // if parents changed
            Object.keys(event.deltas[0]).map((name) => {
                var results = name.match(/^id([A-Z][a-z]+)$/)
                if(results) {
                    if(actions[results[1].toLowerCase()]) {
                        if(entity[name] !== event.deltas[0][name]) {
                            console.log("changes", name)
                            debugger
                            dispatch(actions[results[1].toLowerCase()].popValue(entity[name], {field: event.typeName.toLowerCase()+'s', value: entity.id}))
                            dispatch(actions[results[1].toLowerCase()].push(event.deltas[0][name], {field: event.typeName.toLowerCase()+'s', value: event.deltas[0].id}))
                        }
                    }
                }
            })
        } else {
            dispatch(actions[event.typeName.toLowerCase()].create(event.deltas[0]))
            // we push IDs to parents if any
            Object.keys(event.deltas[0]).map((name) => {
                var results = name.match(/^id([A-Z][a-z]+)$/)
                if(results) {
                    console.log(results[1].toLowerCase())
                    if(actions[results[1].toLowerCase()])
                        dispatch(actions[results[1].toLowerCase()].push(event.deltas[0][name], {field: event.typeName.toLowerCase()+'s', value: event.deltas[0].id}))
                }
            })
        }
    }

    return {type: 'noop'}
}