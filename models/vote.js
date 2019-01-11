module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {

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
  Vote.belongsTo(models.Poll, {
    foreignKey: {
        allowNull: false
    }
});
};
  return Vote;
};
