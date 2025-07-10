const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const initializeDB = require("./db/db.connect");
const noteRoutes = require("./routes/note.routes");
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: FRONTEND_URL, methods: ["GET", "POST"] },
});
app.use(express.json());
app.use(cors());
app.use("/notes", noteRoutes);

initializeDB();

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join_note", (noteId) => {
    socket.join(noteId);
  });

  socket.on("note_update", ({ noteId, content }) => {
    socket.to(noteId).emit("note_update", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to CollabNotes API");
});

server.listen(PORT, () => {
  console.log("Server is running");
});
