const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    /* … */
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
