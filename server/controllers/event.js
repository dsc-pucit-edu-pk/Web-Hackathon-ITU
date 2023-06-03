import { query } from "express";
import EventModel from "../models/Event.js";
import { catchError } from "../utils/catchError.js";

// Create
const createEvent = catchError(async (req, res) => {
    req.body.date = new Date(req.body.date)
    const event = await EventModel.create(req.body);    
    res.status(201).json(event);
});

// Read
const getEvents = catchError(async (req, res) => {
    const events = await EventModel.find();
    res.status(200).json(events);
});

const getEvent = catchError(async (req, res) => {
    const event = await EventModel.findById(req.params.id);
    res.status(200).json(event);
});

// Update
const updateEvent = catchError(async (req, res) => {
    const { id } = req.params;
    const event = await EventModel.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(event);
});

// Delete
const deleteEvent = catchError(async (req, res) => {
    const { id } = req.params;
    const event = await EventModel.findByIdAndDelete(id);
    res.status(200).json(event);
});

// Query
const queryEvents = catchError(async (req, res) => {
    const { title, category, tag, description } = req.query;
    const query = {};
    if(title) query.title = title;
    if(category) query.category = category;
    if(tag) query.tag = ['new'];
    if(description) query.description = description;
    console.log(query);

    const events = await EventModel.find(query);
    res.status(200).json(events);
});

const addUserToEvent = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.userId;

  const [event] = await Promise.all([
    EventModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { participants: userId } },
      { new: true } 
    )
  ]);

  if (!event) {
    return res.status(404).send('Competition not found');
  }
  res.status(200).json({ event });
})

export { createEvent, getEvents, getEvent, updateEvent, deleteEvent, queryEvents, addUserToEvent };