import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  description: { type: String },
  date: { type: Date, required: true, default: () => Date.now() },
  status: { type: Boolean },
  location: { type: String, required: true },
  recurring: { type: Boolean, required: true },
  images: [{ type: String }],

  creatorId: { type: Schema.Types.ObjectId, required: true },

  category: { type: String, required: true },
  tags: [{ type: String }],

  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],

  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

const EventModel = model("Event", EventSchema);
export default EventModel;
