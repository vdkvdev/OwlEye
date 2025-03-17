const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración
const PORT = 3000;

// Ruta básica para probar el servidor
app.get('/', (req, res) => {
    res.send(`
        <h1>OwlEye</h1>
        <button onclick="sendCommand()">Solicitar Captura</button>
        <script>
            function sendCommand() {
                fetch('/command').then(res => res.text()).then(console.log);
            }
        </script>
    `);
});

// Endpoint para enviar el comando "captura"
app.get('/command', (req, res) => {
    io.emit('command', 'captura');
    res.send('Comando "captura" enviado');
});

// Manejar conexiones de clientes
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('screenshot', (img) => {
        const fileName = `screenshot_${Date.now()}.png`;
        fs.writeFileSync(fileName, img);
        console.log(`Captura recibida y guardada como ${fileName}`);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});