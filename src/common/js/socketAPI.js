import io from 'socket.io-client'

// var socket = io(location.hostname + ':8080');
var socket = {};

function getNewSocket() {
  return io(location.hostname + ':8080');
}

export {
  socket,
  getNewSocket
}
