module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    // Group.associate = function (models) {
    //     Group.hasMany(models.User, {
    //     });
    // };

    return Group;
};
//randmom comment to delete
