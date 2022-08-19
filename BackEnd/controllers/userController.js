const User = require('../models/User');

const userController = {
    // get all users
    getAllUsers: async function(req, res) {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (err) {
            res.status(404).send(err);
        }
    },

    //delete one or more users
    deleteUser: async function(req, res){
        try {
            const user = await User.findById(req.params.id);
            res.send('delete');
        }catch (err) {
            res.status(500).send(err);
        }
    }

}

module.exports = userController;
