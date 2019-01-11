module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {
    voteOptionId: {
        type: DataTypes.INTEGER
    },
    votePollId: {
        type: DataTypes.INTEGER
    }
  });

  Vote.associate = function (models) {
    Vote.belongsTo(models.Option, {
        foreignKey: {
            allowNull: false
        }
    });
    Vote.belongsTo(models.User, {
      foreignKey: {
          allowNull: false
      }
  });
};
  return Vote;
};
