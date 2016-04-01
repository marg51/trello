import actions from '../store/actions'

export default function(event) {
    console.log(event)
    if(event.event != "updateModels") {
        return {type: 'noop'}
    }

    if(actions[event.typeName.toLowerCase()])
        return actions[event.typeName.toLowerCase()].update(event.deltas[0].id, event.deltas[0])

    return {type: 'noop'}
}