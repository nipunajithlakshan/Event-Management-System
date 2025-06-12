import EventRepository from "./../database/repository/event-repository.js";

class EventService {
  constructor() {
    this.repository = new EventRepository();
  }
  async addNewEvent(inputs) {
    const {
      name,
      description,
      date,
      location,
      created_by,
      capacity,
      remaining_capacity,
      tags,
    } = inputs;

    try {
      const existingEvent = await this.repository.getEvent({ name });
      if (existingEvent.success) {
        return {
          success: false,
          message: "This Event are already Added.",
          data: null,
        };
      }
      const createEvent = await this.repository.addNewEvent({
        name,
        description,
        date,
        location,
        created_by,
        capacity,
        remaining_capacity,
        tags,
        isActive: true,
      });
      if (!createEvent.success) {
        return {
          success: false,
          message: createEvent.message,
          data: null,
        };
      }

      return {
        success: true,
        message: "Event Added successfully.",
        data: createEvent.data,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllEvents(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const filters = {
      date: query.date,
      location: query.location,
      tags: query.tags,
    };

    return await this.repository.getAllEvents({ page, limit, filters });
  }

  async updateEventById(id, inputs) {
    return await this.repository.updateEventById(id, inputs);
  }
  async registerAttendeeToEvent(eventId, attendeeData) {
    return await this.repository.registerAttendeeToEvent(eventId, attendeeData);
  }

  async deleteEvent(eventId) {
    return await this.repository.deleteEvent(eventId);
  }
  async getAttendeesByEventId(eventId) {
    return await this.repository.getAttendeesByEventId(eventId);
  }
  async getEventAnalyticsById(eventId) {
    return await this.repository.getEventAnalyticsById(eventId);
  }

  async getEventById(eventId) {
  return await this.repository.getEventById(eventId);
}

}

export default EventService;
