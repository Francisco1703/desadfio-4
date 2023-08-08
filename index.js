const socket = io();
socket.emit("message", "Hola, este mensaje proviene del cliente!");
