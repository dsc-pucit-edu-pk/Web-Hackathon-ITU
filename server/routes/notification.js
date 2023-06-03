import express from "express";
import {
  markRead,
  getNotifications,
  sendNotification,
} from "../controllers/notification";

const router = express.Router();

router.patch("/", markRead);
router.post("/", sendNotification);
router.get("/", getNotifications);
