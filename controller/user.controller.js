const errorMessage = require('../error/error.messages');
const errorCodes = require('../constants/error.codes');

const { transactionInst } = require('../dataBase/MySQL').getInit();

const { emailActionsEnum } = require('../constants');
const { passHash } = require('../helpers');
const { userService, mailService } = require('../service');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    addNewUser: async (req, res) => {
        const transaction = transactionInst();
        try {
            const { body: { email, password }, preferLanguage = 'en' } = req;

            const hashPassword = await passHash.hash(password);
            await userService.createUser({ ...req.body, password: hashPassword }, transaction);

            await mailService.sendEmail(email, emailActionsEnum.USER_CREATED, { userName: email });

            await transaction.commit();

            res.status(errorCodes.CREATED).json(errorMessage.USER_CREATED[preferLanguage]);
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    updateUser: async (req, res, next) => {
        const transaction = transactionInst();
        try {
            const { id } = req.query;
            await userService.updateUser(id,);
        } catch (error) {

        }
    },

    deleteUser: async (req, res) => {
        const transaction = transactionInst();
        try {
            const { userId } = req.params;
            const { preferLanguage = 'en' } = req.query;
            const { tokens } = req;
            console.log(tokens._id);
            console.log(userId);
            if (userId.toString() !== tokens._id.toString()) {
                throw new Error(errorMessage.USER_UNAUTHORIZED);
            }

            await mailService.sendEmail(tokens.email, emailActionsEnum.USER_DELETED, { username: tokens.name });

            await userService.deleteUserById(userId);

            await transaction.commit();
            res.json(errorMessage.USER_DELETED[preferLanguage]);
        } catch (err) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
