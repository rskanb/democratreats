module.exports = function (sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Option.associate = function (models) {
    //     Option.belongsTo(models.Poll, {
    //         foreignKey: {
    //             allowNull: false
    //             // allowNull: true
    //         }
    //     });
    // };

    return Request;
};