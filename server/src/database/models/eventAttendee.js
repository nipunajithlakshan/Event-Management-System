const EventAttendee = (sequelize, DataTypes) => {
  return sequelize.define("EventAttendee", {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attendeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

export default EventAttendee;
