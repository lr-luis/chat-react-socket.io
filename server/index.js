//imports 
import Express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const PORT = 3000
const FE_PORT = 5173
const app = Express();
const server = http.createServer(app);
const io = new SocketServer(server
  // add cors options here
  // {
  //   cors: {
  //     origin: `http://localhost:${FE_PORT}`,
  //     methods: ["GET", "POST"]
  //   }
  // }
);

io.on("connection", (socket) => {
  console.log("client connected-->", socket.id);

  socket.on("message", (body) => {
    // console.log(data);
    socket.broadcast.emit("message", {
      body,
      from : socket.id.slice(6)
    });
    // io.emit("message", data);
  })
})


server.listen(PORT);
console.log(`Server running on port ${PORT}.`);