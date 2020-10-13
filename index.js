require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
  
function checkToken(req, res, next) {
    const token = localStorage.getItem('token');
    try {
        jwt.verify(token, process.env.secret);
      } catch(err) {
        res.send('You need to log in')
    }
    next();
};

app.get('/', checkToken,(req, res) => {
    res.send("Hello User")
});

app.get('/login', (req, res) => {
    const user = {
        name: 'Shekhar',
        password:'1234'
    }
    const token = jwt.sign({ user }, process.env.secret);
    localStorage.setItem('token', token);
    return res.send('SUcessFully Logged in');
    
});

app.get('/logout', (req, res) => {
    localStorage.removeItem('token');
    res.send('Sucessfully Logged out');
})

app.use(express.json());
app.listen(process.env.APP_PORT, () => {
    console.log('Server is running at port:', process.env.APP_PORT);

})