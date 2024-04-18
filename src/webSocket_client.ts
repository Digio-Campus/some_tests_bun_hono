// @ts-ignore
import readline from 'readline';

// Crear una nueva conexión WebSocket al servidor
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = function(event) {
    console.log('Conexión abierta');

    socket.send(JSON.stringify({ action: 'subscribe', channel: 'the-group-chat' }));
};

socket.onmessage = function(event) {
    console.log('Mensaje recibido: ' + event.data);
};

socket.onclose = function(event) {
    console.log('Conexión cerrada');
};

function sendMessage(message: string) {
    socket.send(JSON.stringify({ action: 'message', channel: 'the-group-chat', message }));
}

// Crear una interfaz readline usando el proceso de entrada y salida estándar
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Escuchar el evento 'line' que se dispara cuando el usuario introduce un texto y presiona Enter
rl.on('line', (input: string) => {
    sendMessage(input);
});
