import io from 'socket.io-client'

var socket = io(location.hostname + ':8080');

export default socket
