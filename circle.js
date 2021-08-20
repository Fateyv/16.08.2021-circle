import { onLoad, update, getPayLoad } from './app';

const URL = 'wss://balls-fep.herokuapp.com/';
let socket = null;

export function initConnection() {
    socket = new WebSocket(URL);

    socket.onopen = () => {
        const payload = getPayLoad();
        send({
            type: 'add',
            payload: payload,
        });
    };

    socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.type === 'add') {
            onLoad(data);
        } else {
            update(data);
        }
    };

    socket.onclose = () => {
        initConnection();
        console.log('closed');
    };

    socket.onerror = (err) => {
        alert('disconected');
    };
    }
export function send(msg) {
    if (socket.readyState == WebSocket.OPEN) {
        socket.send(JSON.stringify(msg));
    }
}