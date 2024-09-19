import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./src/config/database.js";
import routes from "./src/routes/index.js";
import { socketHandler } from "./src/sockets/socketHandler.js";

const app = express();
const server = http.createServer(app);
const PORT = 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api/v1", routes);

const main = async () => {
  try {
    await connectDB();

    socketHandler(io);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error during application initialization:", error);
    process.exit(1);
  }
};

main();
