const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  photo: { type: String },
  name: { type: String, required: true },
  title: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["Online Event", "Offline Event"], required: true },
  day: { type: String, required: true },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  price: { type: String, required: true },
  host: { type: String, required: true },
  speakers: [speakerSchema],
  details: { type: String },
  dressCode: { type: String },
  ageRestrictions: { type: String },
  tags: [{ type: String }],
  image: { type: String }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
