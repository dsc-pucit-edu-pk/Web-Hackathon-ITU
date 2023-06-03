import { query } from "express";
import EventModel from "../models/Event.js";
import { catchError } from "../utils/catchError.js";

// Create
const createEvent = catchError(async (req, res) => {
  req.body.date = new Date(req.body.date);
  req.body.creatorId = req.userId;
  const event = await EventModel.create(req.body);
  res.status(201).json(event);
});

// Read
const getEvents = catchError(async (req, res) => {
  const searchQuery = req.query.q;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  let query = {};

  if (searchQuery) {
    query = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } }
      ]
    };
  }

  if (req.query.region && req.query.region) {
    query = {
      ...query,
      address: { $regex: req.query.region, $options: "i" }
    };
  }

  try {
    if (query === "") {
      products = await Product.find({}).sort({createdAt: -1}).skip(skip).limit(limit);
    }
    else {
      products = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    }

    const count = await Product.countDocuments(query);
    res.json({
      products, 
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

const getEvent = catchError(async (req, res) => {
  const event = await EventModel.findById(req.params.id);
  res.status(200).json(event);
});

// Update
const updateEvent = catchError(async (req, res) => {
  const { id } = req.params;
  const e = await EventModel.findById(id);
  if (e.creatorId !== req.userId) {
    res.status(403);
    return;
  }
  const event = await EventModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(event);
});

// Delete
const deleteEvent = catchError(async (req, res) => {
  const { id } = req.params;
  const event = await EventModel.findById(id);
  if (evet && event.creatorId === req.userId) {
    const event = await EventModel.findByIdAndDelete(id);
    res.status(200).json(event);
    return;
  } else {
    res.send(403);
  }
});

// Query
const queryEvents = catchError(async (req, res) => {
  const _filters = ["title", "description", "category"];
  const query = req.body;
  const pipeline = [];

  if (query["tags"]) {
    pipeline.push({
      
    });
  }
  if (query.category) {
    pipeline.push({
      $match: {
        category: query.category,
      },
    });
  }
  if (query.title) {
    pipeline.push({
      $match: {
        title: query.title,
      },
    });
  }
  if (query.description) {
    pipeline.push({
      $match: {
        description: query.description,
      },
    });
  }
  console.log(pipeline);

  const events = await EventModel.aggregate(pipeline);
  res.status(200).json(events);
});

const addUserToEvent = catchError(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const [event] = await Promise.all([
    EventModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { participants: userId } },
      { new: true }
    ),
  ]);

  if (!event) {
    return res.status(404).send("Competition not found");
  }
  res.status(200).json({ event });
});

export {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  queryEvents,
  addUserToEvent,
};
