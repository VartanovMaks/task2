const users = require('../database/users');

module.exports = {
    showAll:()=>users,
    addOne:(user)=>{
        users.push(user);
    },
    showOne:(userId)=>{
        return users[userId];
    },
    deleteOne:(userId)=>{
        users.splice(userId,1);
    },
    editOne:(userData, userId)=>{
        return users[userId]=userData;
    },
};