import { getEvent, getEvents, queryEvents, updateEvent, createEvent, deleteEvent } from "../controllers/event.js";

import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.route("/")
.get(getEvents)
.post(createEvent);

router.route("/query")
.get(queryEvents);

router.route("/:id")
.get(getEvent)
.put(updateEvent)
.delete(deleteEvent);

export default router;