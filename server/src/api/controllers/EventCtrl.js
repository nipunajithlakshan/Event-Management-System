import EventService from "../../services/event-service.js";

const eventService = new EventService();

const EventCtrl = {
  addNewEvent: async (req, res, next) => {
    const {
      name,
      description,
      date,
      location,
      created_by,
      capacity,
      remaining_capacity,
      tags,
    } = req.body;

    try {
      const response = await eventService.addNewEvent({
        name,
        description,
        date,
        location,
        created_by,
        capacity,
        remaining_capacity,
        tags,
      });
      // Return the response
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllEvents: async (req, res, next) => {
    try {
      const response = await eventService.getAllEvents(req.query);
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  updateEvent: async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const response = await eventService.updateEventById(id, updateData);

      return res.status(response.success ? 200 : 400).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  registerAttendee: async (req, res, next) => {
    const { id: eventId } = req.params;
    const { name, email } = req.body;

    try {
      const response = await eventService.registerAttendeeToEvent(eventId, {
        name,
        email,
      });

      return res.status(response.success ? 200 : 400).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteEvent: async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await eventService.deleteEvent(id);
      return res.status(response.success ? 200 : 404).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  getAttendeesByEventId: async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await eventService.getAttendeesByEventId(id);

      return res.status(response.success ? 200 : 404).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  getEventAnalytics: async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await eventService.getEventAnalyticsById(id);

      return res.status(response.success ? 200 : 404).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  getEventById: async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await eventService.getEventById(id);

    return res.status(response.success ? 200 : 404).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
}

};

export default EventCtrl;
