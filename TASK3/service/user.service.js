const users = require('../database/users');

module.exports = {
    showAll:()=>users,
    addOne:(user)=>{
        users.push(user);
    },
    showOne:(userId)=>{
        return 
    },
    deleteOne:(userId)=>{
        users.splice(userId,1);
    },
    editOne:(userData, userIndex)=>{
        return users[userIndex]=userData;
    },
    checkUserId:(userId)=>{
     
        const user = users.find((user, index)=>{
            if (user.id.toString() === userId){
                user.index = index;
                return user;
            }
        });
        
        return user;
    }
};