import Chat from "../models/chatModel/chat.js";

export const getAllUsers = async (req, res) => {
  const { room } = req.params;
  try {
    const messages = await Chat.find({ room }).sort({ sentAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Chat.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
};
