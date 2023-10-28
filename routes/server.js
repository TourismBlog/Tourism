const express = require("express");
const app = express();
const user = require('../controllers/user');
const blog = require('../controllers/blog');
const multer = require('multer');
const port = 8080;

app.use(express.json());

app.get('/home', blog.allblogs);
app.post('/addBlog', blog.addblog);
app.get('/getblog/:id', blog.getblog);
app.post('/register', user.rigester);
app.get('/login', user.login);

app.listen(port, () => {console.log(`server running in port ${port}`);});