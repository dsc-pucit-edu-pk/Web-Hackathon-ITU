import cron from "node-cron";
import EventModel from "../models/Event.js";
import NotificationModel from "../models/Notification.js";
import UserModel from "../models/User.js";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

async function sendNotification({ message, recipientId, eventId }) {
  const _notification = {
    message,
    recipientId,
    eventId,
  };
  const res = await NotificationModel.create(_notification);
  return res
}

mongoose
  .connect(
    "mongodb+srv://spoiledwit:IamMydb123@cluster0.ede2ett.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

async function notification() {
  console.log("Sending notification");
  const events = await EventModel.find({ status: "active" });

  const index = Math.floor(Math.random() * events.length);


  for (const event of events) {
    const users = await UserModel.find({ tags: event.tags[index] });

    for (const user of users) {
      const recipientId = user._id;
      const message = `<p>A new event has been created that matches your interests. Check it out here: <a href="eventor.com/event/${event._id}">eventor.com/event/${event._id}</a></p>`;
      
      await sendNotification({ eventId: event._id, recipientId, message });
    }
  }
}
cron.schedule("* * * * *", notification);
