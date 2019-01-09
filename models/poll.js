module.exports = function (sequelize, DataTypes) {
  var Poll = sequelize.define("Poll", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Poll.associate = function (models) {
    // Associating Poll with Posts
    // When an Poll is deleted, also delete any associated Posts
    Poll.hasMany(models.Option, {
      onDelete: "cascade"
    });
  };

  return Poll;
};
