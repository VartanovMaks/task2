const express = require('express');
const path = require('path');
const rootRouter = require('./router/router');
const users = require('./database/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);

// app.post('/login', (req,res)=>{
 
//   let tmpUser = users.find(item=>item.name===req.body.name);
  
//   if (!tmpUser){
//     res.render('message',{errorMessage:`${req.body.name} - user is not registered`, goToPage:'login'});
//     return
//   }

//   if (!(tmpUser.password === req.body.password)){
//     res.render('message',{errorMessage:'incorrect password', goToPage:'login'});
//     return
//   }

//   res.render('users',{users:users, userName:req.body.name});
// });

// app.post('/register', (req,res)=>{
  
//   let tmpUser = users.find(item=>item.name===req.body.name);
  
//   if(tmpUser){
//       let message = `User ${tmpUser.name} already registered. Input again carefully!`;
//       res.render('message',{errorMessage:message, goToPage:'register'});
//       return
//   }

//   if (!(req.body.passwordFirst === req.body.passwordSecond)){
//     let message = `Second password attempt doesn\'t match. 
//       ${req.body.passwordFirst} != ${req.body.passwordSecond}.
//        Input again carefully!`;
//     res.render('message',{errorMessage:message, goToPage:'register'});
//     return
//   }

//   tmpUser={name:req.body.name,
//           age:req.body.age,
//           password:req.body.passwordFirst
//   }

//   users.push(tmpUser);
//   res.render('users',{users:users, userName:req.body.name})
// });

app.listen(3000, () => {
  console.log('App listen 3000');
});

