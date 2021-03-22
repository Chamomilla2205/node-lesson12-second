const db = require('../dataBase/MySQL').getInit();
// require('../dataBase/models/Cars');

module.exports = {
    findUsers: () => {
        const User = db.getModel('User');

        return User.findAll();
    },

    createUser: (userObject, transaction) => {
        const User = db.getModel('User');

        return User.create(userObject, {transaction});
    },

    updateUser: (id, userObject, transaction) => {
        const User = db.getModel('User');

        return User.update(userObject, {
            where: {id},
            returning: true,
            transaction
        });
    },

    findUserById: async (id) => {
        const User = db.getModel('User');

        const { dataValues } = await User.findOne({ where: { id } });
        return dataValues;
    },

    findOneUser: async (findObj) => {
        const User = db.getModel('User');

        const { dataValues } = await User.findOne({ where: findObj });
        return dataValues;
    },

    deleteUserById: (userId) => {
        const User = db.getModel('User');

        User.findByIdAndRemove(userId);
    }
};
