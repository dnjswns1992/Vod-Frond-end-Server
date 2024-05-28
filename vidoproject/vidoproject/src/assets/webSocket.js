export function createWebSocketConnection(url, sessionId) {
    const socket = new WebSocket(`${url}?sessionId=${sessionId}`);

    socket.onopen = function(event) {
        console.log('WebSocket is open now.');
    };

    socket.onmessage = function(event) {
        console.log('WebSocket message received:', event);
    };

    socket.onclose = function(event) {
        console.log('WebSocket is closed now.');
    };

    socket.onerror = function(error) {
        console.log('WebSocket error:', error);
    };

    return socket;
}

export default {
    createWebSocketConnection
};
