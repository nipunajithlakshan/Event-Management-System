const Attendee = (sequelize, DataTypes) => {
  return sequelize.define("Attendee", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  });
};

export default Attendee;
