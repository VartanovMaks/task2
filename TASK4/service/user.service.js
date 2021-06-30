const { User } = require('../dataBase');

module.exports = {
    
    findUserByName: async (user)=>{
        try{
            console.log(user.name)
            const foundedUser = await User.findOne({name:user.name});
            console.log(foundedUser)
            return foundedUser;
        } catch(e){
            next(e);
        }
    },
    // deleteOne:(userId)=>{
    //     users.splice(userId,1);
    // },
    // editOne:(userData, userId)=>{
    //     return users[userId]=userData;
    // },
    // checkUserId:(userId)=>{
    //     let user= undefined; 
    //     if(userId >= 0 && userId < users.length){
    //        user = users[userId];
    //     }
    //     return user;
    // }
};