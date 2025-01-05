const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const projectModel = require("./models/project.model");
const {generateResult} = require('./services/ai.service')

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
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
      return next(new Error("Authentication error for no token"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new Error("Authentication error for invalid decoding"));
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

  socket.on("project-message", async (data) => {
    const message = data.message;

    const aiIsPresentInMessage = message.includes("@ai");
    socket.broadcast.to(roomId).emit("project-message",data);
    if (aiIsPresentInMessage) {

        const prompt = message.replace('@ai', '');
        const result = await generateResult(prompt);
        io.to(roomId).emit('project-message', {
            message: result,
            sender: {
                email: 'AI',
                _id: 'ai'
            }
        })
      return;
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    socket.leave(socket.roomId);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
