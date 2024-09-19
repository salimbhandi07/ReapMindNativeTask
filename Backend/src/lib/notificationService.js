import fetch from "node-fetch";
import { getAccessToken } from "../../firebase.js";

export const sendNotification = async (deviceToken, message) => {
  const accessToken = await getAccessToken();
  const notificationPayload = {
    message: {
      token: deviceToken,
      notification: {
        title: "New Message",
        body: message,
      },
    },
  };

  try {
    const response = await fetch(
      "https://fcm.googleapis.com/v1/projects/management-app-8740f/messages:send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationPayload),
      }
    );

    if (response.ok) {
      console.log("Notification sent successfully");
    } else {
      console.error("Failed to send notification", response.statusText);
    }
  } catch (error) {
    console.error("Error sending FCM notification:", error);
  }
};
