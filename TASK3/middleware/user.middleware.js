const userService=require('../service/user.service');

module.exports = {
    checkIsUserExists: (req, res, next)=>{
        const {userId} = req.params;
        const userById = userService.checkUserId(userId);
        
        if(!userById) {
            throw new Error(`User with id ${userId} not found`);
        }

        req.user = userById;
        
        next();
    },
    checkDuplicateId:(req, res, next)=>{
        const isIdExist = userService.
    }

};