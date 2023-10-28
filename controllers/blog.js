const db = require(`../models/config`);
require('dotenv').config();

async function allblogs (req, res) {
    try {
      let result = await db.query(`SELECT users.user_name, blogs.blog_id, blogs.blog_title, blogs.image, blogs.place_name, blogs.place_location 
      FROM users INNER JOIN blogs ON users.user_id = blogs.the_user;`);
      res.json(result.rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).send('error in get the home');
    };
};

async function addblog (req, res) {
    const { blog_title, blog_description, image, place_name, place_location } = req.body;
    try {
        const query = `
            INSERT INTO blogs (blog_title, blog_description, the_user, image, place_name, place_location)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING blog_id`;
        const values = [blog_title, blog_description, process.env.theUserId, image, place_name, place_location];
        if (process.env.theUserId != null){
            const result = await db.query(query, values);
            const newBlogId = result.rows[0].blog_id;
            res.status(201).json({ message: 'Blog added successfully', blog_id : newBlogId });
        } else {
            res.json("you are not loggedin");
        }
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ error: 'Failed to add the blog' });
    };
};

async function getblog(req, res) {
    try{
        const query = 'select * from blogs where blog_id = $1';
        const blogId = req.params.id;
        const result = await db.query(query, [blogId]); 
        res.json(result.rows);
    } catch (error){
        console.error('Failed to get one blog: ', error);
        res.status(500).json({ error: 'Failed to get one blog'});
    };
};

module.exports = {
    allblogs,
    addblog,
    getblog,
};