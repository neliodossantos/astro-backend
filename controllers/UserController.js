const {User: UserModel} = require('../models/User');

const User = {
    getUser: async (req, res) => {
        const id = req.params.id;
        const user = await UserModel.findById(id,'-senha');

        if(!user){
            res.status(404).json({msg: 'User not found',error});
            return;
        }
        res.status(200).json({user});
    },
    returnUserLogado : async (req, res) => {
        res.json(req.userData);
    }
}
module.exports = User;