import { sendNotification } from "../lib/notificationService.js";
import Chat from "../models/chatModel/chat.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_room", async (room) => {
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);

      try {
        const messages = await Chat.find({ room }).sort({ createdAt: 1 });
        socket.emit("previous_messages", messages);
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    });

    socket.on("send_message", async (data) => {
      const { senderId, receiverId, message, deviceToken } = data;
      const room = [senderId, receiverId].sort().join("_");

      const newMessage = new Chat({ senderId, receiverId, message, room });
      await newMessage.save();

      await sendNotification({ message, deviceToken });

      io.to(room).emit("receive_message", newMessage);
    });

    socket.on("delete_message", async (messageId) => {
      try {
        const deletedMessage = await Chat.findByIdAndDelete(messageId);

        if (deletedMessage) {
          io.to(deletedMessage.room).emit("message_deleted", messageId);
        } else {
          console.error(`Message with ID ${messageId} not found`);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};
