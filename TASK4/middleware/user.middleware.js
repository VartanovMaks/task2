const { User } = require('../dataBase');

module.exports = {
    checkIsUserExists: async (req, res, next)=>{
        try{
            const {userId} = req.params;
            const userById = await User.findById(userId);
            
            if(!userById) {
                throw new Error(`User with id ${userId} not found`);
            }
            
            req.user = userById;
            
            next();
        } catch (e) {
            next(e);
        }
    }
    
}; 