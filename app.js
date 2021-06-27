const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const users = [
  { name: 'Dima', age: 22, password: '1111' },
  { name: 'Vika', age: 18, password: '2222' },
  { name: 'Khrystyna', age: 16, password: '3333' },
  { name: 'Viktor', age: 25, password: '4444' },
]
const app = express();

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/login', (req,res)=>res.render('login'));
app.get('/register', (req, res) =>res.render('register'));

app.post('/login', (req,res)=>{
 
  console.log(req.params);
  console.log('+++++++++++++++');
  console.log(req.query);
  console.log('+++++++++++++++');
  console.log(req.body);

  let tmpUser = users.find(item=>item.name===req.body.name);
  
  if (!tmpUser){
    res.render('message',{errorMessage:`${req.body.name} - user is not registered`, goToPage:'login'});
    return
  }

  if (!(tmpUser.password === req.body.password)){
    res.render('message',{errorMessage:'incorrect password', goToPage:'login'});
    return
  }

  res.render('users',{users:users, userName:req.body.name});
});

app.post('/register', (req,res)=>{
  
  let tmpUser = users.find(item=>item.name===req.body.name);
  
  if(tmpUser){
      let message = `User ${tmpUser.name} already registered. Input again carefully!`;
      res.render('message',{errorMessage:message, goToPage:'register'});
      return
  }

  if (!(req.body.passwordFirst === req.body.passwordSecond)){
    let message = `Second password attempt doesn\'t match. 
      ${req.body.passwordFirst} != ${req.body.passwordSecond}.
       Input again carefully!`;
    res.render('message',{errorMessage:message, goToPage:'register'});
    return
  }

  tmpUser={name:req.body.name,
          age:req.body.age,
          password:req.body.passwordFirst
  }

  users.push(tmpUser);
  res.render('users',{users:users, userName:req.body.name})
});

app.listen(3000, () => {
  console.log('App listen 3000');
});

