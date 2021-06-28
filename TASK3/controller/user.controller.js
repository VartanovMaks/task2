const userService = require('../service/user.service');

module.exports = {
    getAllUsers:(req,res)=>{
        const users = userService.showAll();
        res.json(users);
    },
    addNewUser:(req,res)=>{
        userService.addOne(req.body);
        res.json(req.body);
    },
    getUserById:(req,res)=>{
        const {user} = req;
        res.json(user);
    },
    removeUserById:(req,res)=>{
        userService.deleteOne(req.params.userId);
        res.json({msg:'remove user by id', id:req.params.userId});
    },
    editUserById:(req,res)=>{
        const index = req.user.index;
        delete req.user.index;
        userService.editOne(req.body, index);
        res.json({msg:'edit user by id', id:req.params.userId});
    }
}