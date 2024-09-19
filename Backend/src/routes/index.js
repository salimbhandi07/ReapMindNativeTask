import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes/user.js";
import authRoutes from "./authRoutes/auth.js";
import chatRoutes from "./chatRoutes/chat.js";

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/chat", chatRoutes);

export default router;
