const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // transports: ["websocket", "polling"],
    // credentials: true,
  },
  // allowEIO3: true,
});

//Socket.io
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("socket id", socket.id);

  socket.on("disconnect", function () {
    io.emit("users-changed", { user: socket.nickname, event: "left" });
  });

  socket.on("set-nickname", (nickname) => {
    socket.nickname = nickname;
    console.log("nickname", socket.nickname);
    // sockets[nickname] = socket;
    io.emit("users-changed", { user: nickname, event: "joined" });
  });

  socket.on("add-message", (message) => {
    console.log("message", message);
    io.emit(message.to_id, {
      to: message.to_id,
      message: message.text,
      from_id: socket.nickname,
      status: message.status,
      date_time: new Date(),
    });
    // io.emit('12',{number:number})
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

server.listen(port, () => {
  console.log("listening for request on port" + port);
});
