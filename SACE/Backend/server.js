const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const projectModel = require("./models/project.model");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.use(async(socket, next) => {
  try {
    const token =
      socket.handshake.auth.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    const projectId = socket.handshake.query.projectId;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid project ID"));
    }

    socket.project = await projectModel.findOne({ _id: projectId });

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new Error("Authentication error"));
    }

    socket.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
    const roomId = socket.project._id.toString();
  console.log("a user connected");

  socket.join(roomId);
  
  socket.on("project-message", (data) => {
    console.log(data);
    socket.broadcast.to(roomId).emit('project-message', data);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    socket.leave(socket.roomId);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
