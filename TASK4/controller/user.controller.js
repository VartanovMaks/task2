const { responseCodesEnum } = require('../constants');
const {userService} = require('../service');
const { User } = require('../dataBase');

module.exports = {
    getAllUsers: async (req,res)=>{
        try{
            const users = await User.find({});
            res
            .status(responseCodesEnum.OK)
            .json(users);
        } catch (e){
            next(e);
        }
    },
    addNewUser: async (req,res)=>{
        try{
            const checkedUser = userService.findUserByName(req.body);
            if (!(checkedUser == null)){
                console.log('user name not found. we may add', req.body);
                const u = await User.create(req.body);
                res
                .status(responseCodesEnum.CREATED)
                .json(req.body);
                return
            }
            res
            .status(responseCodesEnum.NO_CONTENT)
            .json(req.body);
        }catch (e){
          console.log(e);
        }
    },
    getUserById: async (req,res)=>{
        try{
            const user = await User.findById(req.params.userId)
            res
            .status(responseCodesEnum.OK)
            .json(user);
        }catch (e){
            next(e);
        }
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