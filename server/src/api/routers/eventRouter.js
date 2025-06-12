import express from "express";
const router = express.Router();

import EventCtrl from "../controllers/EventCtrl.js";

router.post("/add-event", EventCtrl.addNewEvent);
router.get("/get-all-events", EventCtrl.getAllEvents);
router.put("/update-event/:id", EventCtrl.updateEvent);
router.post("/register-attendee/:id", EventCtrl.registerAttendee);
router.delete("/delete-event/:id", EventCtrl.deleteEvent);
router.get("/attendees/:id", EventCtrl.getAttendeesByEventId);
router.get("/analytics/:id", EventCtrl.getEventAnalytics);
// In your routes file
router.get("/:id", EventCtrl.getEventById);


export default router;
