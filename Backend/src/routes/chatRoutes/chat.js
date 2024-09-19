import express from "express";
import {
  deleteMessage,
  getAllUsers,
} from "../../controllers/chatController.js";

const router = express.Router();

router.get("/messages/:room", getAllUsers);
router.delete("/delete-message/:id", deleteMessage);

export default router;
