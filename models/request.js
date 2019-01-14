module.exports = function (sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 200]
            }
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