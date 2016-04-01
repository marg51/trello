// please read for a better solution https://github.com/joewalnes/reconnecting-websocket
function connect(token, callbacks = [], listened = []) {

    let socket;
    let reqid = 0
    function listenTo(boardId) {
        socket.send(JSON.stringify({"type":"subscribe","modelType":"Board","idModel":boardId,"tags":["clientActions","updates"],"invitationTokens":[],"reqid":reqid++}))
    }


    function _connect() {
        socket = new WebSocket("wss://trello.com/1/Session/socket?token="+token);

        socket.onopen = () => {
            console.info("connected", new Date())
            listened.map(listenTo)
        }

        socket.onmessage = data => {
            try {
                const parsed = JSON.parse(data.data)

                if(parsed.notify)
                    callbacks.map(callback => callback(parsed.notify))
            } catch (e) {
                socket.send('')
            }
        }

        socket.onerror = socket.onclose = () => {
            clearInterval(refreshIntervalId);
            console.error("deconnected", new Date())

            setTimeout(() => {
                _connect()
            }, 500)

        }
    }

    _connect()


    const api = {
        onEvent: callback => {
            callbacks.push(callback)
        },
        listenTo: boardId => {
            listened.push(boardId)
            listenTo(boardId)
        }
    }

    return api
}

export default connect