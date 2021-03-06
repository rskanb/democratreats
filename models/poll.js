
module.exports = function (sequelize, DataTypes) {
  var Poll = sequelize.define("Poll", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    closingTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pollOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Poll.associate = function (models) {
    // Associating Poll with Options
    // When an Poll is deleted, also delete any associated Options
    Poll.hasMany(models.Option, {
      onDelete: "cascade"
    });
    Poll.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Poll.hasMany(models.Vote, {
      onDelete: "cascade"
    });
  };

  Poll.associate = function (models) {
    // Associating Poll with Posts
    // When an Poll is deleted, also delete any associated Posts
    Poll.hasMany(models.Option, {
      onDelete: "cascade"
    });
  };

  return Poll;
};
