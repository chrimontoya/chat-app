// server/index.js
import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*"
  }
});

console.log("Socket.IO server running on http://localhost:3000");

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("mensaje", data); // Broadcast a todos
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});
