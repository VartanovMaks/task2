module.exports = {
    getAllUsers:(req,res)=>{
        res.json('Get all users');
    },
    addNewUser:(req,res)=>{
        res.json('Add new user');
    },
    getUserById:(req,res)=>{
        res.json({msg:'get user by id', id:req.params.userId});
    },
    removeUserById:(req,res)=>{
        res.json({msg:'remove user by id', id:req.params.userId});
    },
    editUserById:(req,res)=>{
        res.json({msg:'edit user by id', id:req.params.userId});
    }
}