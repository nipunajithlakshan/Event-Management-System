import db from "../models/index.js";

const { Event, Attendee } = db;

class EventRepository {
  async getEvent(filters) {
    try {
      const existingEvent = await Event.findOne({ where: filters });

      return {
        success: !!existingEvent,
        message: existingEvent ? "Event fetched!" : "Event not found.",
        data: existingEvent || null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async addNewEvent(inputs) {
    try {
      const createdEvent = await Event.create(inputs);

      return {
        success: true,
        message: "Event Added successfully.",
        data: createdEvent,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async getAllEvents({ page = 1, limit = 10, filters = {} }) {
    try {
      const offset = (page - 1) * limit;

      const whereClause = {}; // Add conditions based on filters

      // Filtering by date, location, tags
      if (filters.date) whereClause.date = filters.date;
      if (filters.location) whereClause.location = filters.location;
      if (filters.tags) whereClause.tags = filters.tags;

      const { count, rows } = await Event.findAndCountAll({
        where: whereClause,
        offset,
        limit,
        order: [["date", "ASC"]],
      });

      return {
        success: true,
        message: "Events fetched successfully.",
        data: {
          events: rows,
          pagination: {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async updateEventById(id, updateData) {
    try {
      const event = await Event.findByPk(id);

      if (!event) {
        return {
          success: false,
          message: "Event not found.",
          data: null,
        };
      }

      // Disallow update if event date is in the past
      if (new Date(event.date) < new Date()) {
        return {
          success: false,
          message: "Cannot update a past event.",
          data: null,
        };
      }

      await event.update(updateData);

      return {
        success: true,
        message: "Event updated successfully.",
        data: event,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async registerAttendeeToEvent(eventId, attendeeData) {
    try {
      const event = await Event.findByPk(eventId);

      if (!event) {
        return {
          success: false,
          message: "Event not found.",
          data: null,
        };
      }

      if (event.remaining_capacity <= 0) {
        return {
          success: false,
          message: "Event is full.",
          data: null,
        };
      }

      const [attendee] = await Attendee.findOrCreate({
        where: { email: attendeeData.email },
        defaults: attendeeData,
      });

      const alreadyRegistered = await event.hasAttendee(attendee);
      if (alreadyRegistered) {
        return {
          success: false,
          message: "Attendee already registered for this event.",
          data: null,
        };
      }

      // Register attendee
      await event.addAttendee(attendee);

      //  Decrease remaining capacity
      event.remaining_capacity -= 1;
      await event.save();

      return {
        success: true,
        message: "Attendee registered successfully.",
        data: {
          eventId: event.id,
          attendeeId: attendee.id,
          remaining_capacity: event.remaining_capacity,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async deleteEvent(eventId) {
    try {
      const event = await Event.findByPk(eventId);

      if (!event) {
        return {
          success: false,
          message: "Event not found.",
          data: null,
        };
      }

      await event.destroy(); // 👈 This triggers cascade

      return {
        success: true,
        message: "Event deleted successfully (and registrations removed).",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async getAttendeesByEventId(eventId) {
    try {
      const event = await Event.findByPk(eventId);

      if (!event) {
        return {
          success: false,
          message: "Event not found.",
          data: null,
        };
      }

      const attendees = await event.getAttendees(); // 👈 association method

      return {
        success: true,
        message: "Attendees fetched successfully.",
        data: attendees,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async getEventAnalyticsById(eventId) {
    try {
      const event = await Event.findByPk(eventId, {
        include: [{ model: Attendee }],
      });

      if (!event) {
        return {
          success: false,
          message: "Event not found.",
          data: null,
        };
      }

      const totalAttendees = event.Attendees.length;
      const capacityUtilization = (
        (totalAttendees / event.capacity) *
        100
      ).toFixed(2);

      return {
        success: true,
        message: "Event analytics fetched successfully.",
        data: {
          eventId: event.id,
          eventName: event.name,
          totalAttendees,
          capacity: event.capacity,
          remainingCapacity: event.remaining_capacity,
          capacityUtilization: `${capacityUtilization}%`,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async getEventById(eventId) {
  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return {
        success: false,
        message: "Event not found.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Event fetched successfully.",
      data: event,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: error.stack,
    };
  }
}

}

export default EventRepository;
