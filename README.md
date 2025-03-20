# 🦉 OwlEye - v0.1

## 📋 Description
OwlEye is an **educational** tool for learning about client-server interactions and screenshot capturing, built with **Node.js**, **Socket.IO**, and **screenshot-desktop**. It consists of a client (mouse) and a server (owl) for remote screenshot management.

## ✨ Key Features
- 📸 Remote screenshot capturing
- 🖥️ Terminal-based server control
- 🕶️ Stealth client execution (no visible console)
- 📂 Screenshots saved in mouse_seen folder
- ⚡ Real-time client-server communication

## 🛠️ Installation
```bash
# Clone the repository
git clone https://gitlab.com/VIfront/owl-eye.git

# Install dependencies
npm install

# Run the server
node owl.js

# Build the client executable for Windows (mouse)
npm run build
```

## 🔧 Configuration
1. Enter your ip in the .env:
```
SERVER_URL=http://<your-server-ip>:3000
```
2. Start the server `(node owl.js)`.
3. Run the client `(owleye.exe)` in Windows.
4. On the server terminal, select a client by number to request a screenshot.

## 📝 Developer Notes
- The `node_modules` folder is not included in the repository
- Ensure Node.js and npm are installed on your system.
- Run `npm install` after cloning the project
- Screenshots are saved in the mouse_seen folder on the server.

## 🔒 License
This project is licensed under the GNU General Public License v3.0 (GPL-3.0).
For more details, see the [LICENSE](LICENSE) file in the repository.