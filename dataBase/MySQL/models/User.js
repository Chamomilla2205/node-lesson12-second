const DataTypes = require('sequelize')

module.exports = (client) => {
    const User = client.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.INTEGER
            },
            password: {
                type: DataTypes.STRING
            },
            bornYear: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );
    return User;
};
