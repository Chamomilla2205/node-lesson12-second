const DataTypes = require('sequelize');

module.exports = (client) => {
    const Car = client.define(
        'Car',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            model: {
                type: DataTypes.STRING
            },
            price: {
                type: DataTypes.INTEGER
            },
            prodYear: {
                type: DataTypes.INTEGER
            },
            color: {
                type: DataTypes.STRING
            },
            crushed: {
                type: DataTypes.BOOLEAN
            }
        }
    );
    return Car;
};
