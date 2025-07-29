const express = require("express")
const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.json())
const {initializeDatabase} = require("./db/db.connect")
const Event = require("./models/event.models")
initializeDatabase();

async function seedData(newEvent){
  try{
const event = new Event(newEvent)
const savedEvent = await event.save()
return savedEvent;
  }catch(error){
    throw error
  }
}

app.post("/events", async (req,res)=>{
  try{
const event = await seedData(req.body)
res.status(201).json({message:"event added successfully", event:event})
  }catch(err){
res.status(500).json({err:"failed to add event"})
  }
})

async function getAllEvents(){
  try{
const allEvents = await Event.find()
return allEvents;
  }catch(err){
    throw err
  }
}

app.get("/events", async (req,res)=>{
  try{
const events = await getAllEvents()
res.send(events)
  }catch(err){
res.status(404).json({error:"events not found"})
  }
})

async function getEventByTitle(eventTitle){
  try{
const event = await Event.find({title:eventTitle})
return event
  }catch(err){
    throw err
  }
}

app.get("/events/:title", async (req,res)=>{
  try{
const eventDetails = await getEventByTitle(req.params.title)
if(eventDetails){
  res.send(eventDetails)
}else{
  res.status(404).json({err:"event not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch event"})
  }
})

async function getEventByDate(eventDate){
  try{
const event = await Event.find({date:eventDate})
return event
  }catch(err){
    throw err
  }
}

app.get("/events/date/:eventDate", async (req,res)=>{
  try{
const eventDetails = await getEventByDate(req.params.eventDate)
if(eventDetails){
  res.send(eventDetails)
}else{
  res.status(404).json({err:"event not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch event"})
  }
})

async function getEventByCity(eventCity){
  try{
const event = await Event.find({city:eventCity})
return event
  }catch(err){
    throw err
  }
}

app.get("/events/city/:eventCity", async (req,res)=>{
  try{
const eventDetails = await getEventByCity(req.params.eventCity)
if(eventDetails){
  res.send(eventDetails)
}else{
  res.status(404).json({err:"event not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch event"})
  }
})

async function updateById(eventId, dataToUpdate){
  try{
const event = await Event.findByIdAndUpdate(eventId, dataToUpdate, {new:true})
return event
  }catch(err){
    throw err
  }
}

app.post("/events/:eventId", async (req,res)=>{
  try{
const eventDetails = await updateById(req.params.eventId, req.body)
if(eventDetails){
  res.status(201).json({message:"event updated successfully.", event:eventDetails})
}else{
  res.status(404).json({err:"event not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch event"})
  }
})

async function updateByTitle(eventTitle, dataToUpdate){
  try{
const event = await Event.findOneAndUpdate({title:eventTitle}, dataToUpdate, {new:true})
return event
  }catch(err){
    throw err
  }
}

app.post("/events/title/:eventTitle", async (req,res)=>{
  try{
const eventDetails = await updateByTitle(req.params.eventTitle, req.body)
if(eventDetails){
  res.status(201).json({message:"event updated successfully.", event:eventDetails})
}else{
  res.status(404).json({err:"event not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch event"})
  }
})

async function deleteById(eventId){
  try{
const event = await Books.findByIdAndDelete(eventId)
return event
  }catch(err){
    throw err
  }
}

app.delete("/events/:eventId", async (req,res)=>{
  try{
const eventDetails = await deleteById(req.params.eventId)
if(eventDetails){
  res.status(201).json({message:"This event deleted successfully.", event:eventDetails})
}else{
  res.status(404).json({err:"event not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch event"})
  }
})

const PORT = 3000
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})