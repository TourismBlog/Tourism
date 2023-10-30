const db = require(`../models/config`);
require('dotenv').config();

async function rig (req, res) {
    const {user_name, user_email, user_password} = req.body;
    try{
        const query = `INSERT INTO users (user_name, user_email, user_password)
                            VALUES ($1, $2, $3)
                            RETURNING user_id`;
        const values = [user_name, user_email, user_password];
        let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (user_name.length < 3){
            res.json("very short name, add more then 3 characters");
        } else if (!pattern.test(user_email)){
            res.json("your email is not valid!");
        } else if (user_password.length < 8){
            res.json("very short password, add more then 8 characters");
        } else {
            const result = await db.query(query, values);
            const newUserId = result.rows[0].user_id;
            res.status(201).json({ message: 'User added successfully', user_id: newUserId });
        }
    } catch (error){
        console.error('Failed to register : ', error);
        res.status(500).json({ error: 'Failed to register'});
    };
};

async function login (req, res) {
    const {user_email, user_password} = req.body;
    try{
        console.log(user_email);
        const query = `select user_id, user_email, user_password from users where user_email = $1 and user_password = $2`;
        const values = [user_email, user_password];
        const result = await db.query(query, values);
        let user = (result.rows[0]);
        console.log(user);
        if (user.user_email == user_email && user.user_password == user_password){
            process.env.theUserId = user.user_id;
            console.log(process.env.theUserId);
            res.json('good');
        } else {
            res.json('notgood');
        }
    } catch (error){
        console.error('Failed to login : ', error);
        res.status(500).json({ error: 'Failed to login'});
    };
};



module.exports = {
    rig,
    login,
};