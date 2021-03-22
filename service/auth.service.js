const db = require('../dataBase/MySQL').getInit();

module.exports = {
    newToken: (tokens, userId) => {
        const O_Auth = db.getModel('O_Auth');

        return O_Auth.create({ ...tokens, userId });
    },

    deleteToken: (_id) => {
        const O_Auth = db.getModel('O_Auth');

        return O_Auth.deleteOne({ _id });
    },

    addNewToken: (tokens, _user_id) => {
        const O_Auth = db.getModel('O_Auth');

        return O_Auth.create({ ...tokens, _user_id });
    }

};
