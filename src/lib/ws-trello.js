// please read for a better solution https://github.com/joewalnes/reconnecting-websocket
function connect(token, callbacks = [], listened = []) {

    let socket;
    let reqid = 0


    function _connect() {
        socket = new WebSocket("wss://trello.com/1/Session/socket?token="+token);

        socket.onopen = () => {
            console.info("connected", new Date())
            listened.map((e) => socket.send(e))
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

            return () => {
                callbacks.splice(callbacks.indexOf(callback), 1)
            }
        },
        listenTo: (type,id) => {
            if(type == "member")
                var query = {"type":"subscribe","modelType":"Member","idModel":id,"tags":["messages","updates"],"invitationTokens":[],"reqid":reqid++}
            if(type == "board")
                query = {"type":"subscribe","modelType":"Board","idModel":id,"tags":["clientActions","updates"],"invitationTokens":[],"reqid":reqid++}
            if(type == "orga")
                query = {"type":"subscribe","modelType":"Organization","idModel":id,"tags":["allActions","updates"],"invitationTokens":[],"reqid":reqid++}

            listened.push(JSON.stringify(query))
        },
        getStatus() {
            return socket.readyState
        },
        send(data) {
            socket.send(data)
        }
    }

    return api
}

export default connect