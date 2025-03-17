OwlEye - placeholder

# Descripción
OwlEye es una herramienta desarrollada en Node.js para simular técnicas de persistencia, comunicación cliente-servidor y extracción de datos con fines educativos.

# Características
- Persistencia: Se copia a la carpeta de arranque de Windows.
- Ejecución sigilosa: Opera sin interfaz visible.
- Comunicación: Usa WebSockets para conectar con un servidor local.
- Funcionalidad: Captura pantallas bajo demanda y las envía al servidor.

# Advertencia Legal
Este proyecto es estrictamente educativo. No me hago responsable por cualquier uso indebido o no autorizado.
Úselo solo con permiso explícito del propietario del sistema y en entornos de prueba.

# Requisitos
- Node.js y npm instalados.
- Dependencias: socket.io, socket.io-client, screenshot-desktop, express, pkg.

# Instalación
1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura la IP del servidor en `client.js`.

# Uso
1. Inicia el servidor: `node server.js`.
2. Ejecuta el cliente: `OwlEye.exe` (generado con `pkg client.js --targets node14-win-x64 --output OwlEye.exe`).
3. Usa la interfaz web en `http://localhost:3000` para enviar comandos.

# Autor
Creado por [tu nombre o alias, si deseas incluirlo].


# Licencia
Uso educativo únicamente.