import Notification from "../models/Notification.js";

// Get all notifications for a user

export const getNotifications = async (req, res) => {
  const uid = req.userId;
  try {
    const notifications = await Notification.find({ recipientId: uid }).sort({
      createdAt: -1,
    });
    // here populating the notifications whose type is adAddedToWishlist with those products titles

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Mark the notification as read

export const markRead = async (req, res) => {
  const uid = req.userId;

  try {
    await Notification.updateMany({ recipientId: uid }, { isRead: true });
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Send a notification to a user

export const sendNotification = async (req, res) => {
  const { recipientId, message } = req.body;
  await Notification.create({
    recipientId,
    message,
  });
  res.status(200).json({ message: "Notification sent" });
};
