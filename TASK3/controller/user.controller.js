const {userService} = require('../service');

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
        const user = userService.showOne(req.params.userId)
        res.json(user);
    },
    removeUserById:(req,res)=>{
        userService.deleteOne(req.params.userId);
        res.json({msg:'remove user by id', id:req.params.userId});
    },
    editUserById:(req,res)=>{
        userService.editOne(req.body, req.params.userId);
        res.json({msg:'edit user by id', id:req.params.userId});
    }
}