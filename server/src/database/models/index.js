import { Sequelize } from "sequelize";
import { sequelize } from "../../database/connection.js";
import EventModel from "./Event.js";
import AttendeeModel from "./Attendees.js";
import EventAttendeeModel from "./eventAttendee.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Event = EventModel(sequelize, Sequelize);
db.Attendee = AttendeeModel(sequelize, Sequelize);
db.EventAttendee = EventAttendeeModel(sequelize, Sequelize);

// Associations
db.Event.belongsToMany(db.Attendee, {
  through: db.EventAttendee,
  foreignKey: "eventId",
  onDelete: "CASCADE",
});
db.Attendee.belongsToMany(db.Event, {
  through: db.EventAttendee,
  foreignKey: "attendeeId",
  onDelete: "CASCADE",
});

export default db;
