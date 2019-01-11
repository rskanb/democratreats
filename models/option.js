module.exports = function (sequelize, DataTypes) {
    var Option = sequelize.define("Option", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        vote: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    Option.associate = function (models) {
        Option.belongsTo(models.Poll, {
            foreignKey: {
                allowNull: false
                // allowNull: true
            }
        });
    };

    return Option;
};