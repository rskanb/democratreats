module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,20]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      // validate: {
      //   isEmail: true
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  });
  return User;
};
