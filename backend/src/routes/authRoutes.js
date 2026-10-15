import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
const router = express.Router();

//register a new user   
router.post('/register',  (req, res) => {
    const { username, password } = req.body;
    //encrypt the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    //store the user in the database
    try{
        const newUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
        const result = newUser.run(username, hashedPassword);
        //add a default todo for the new user to know how to use the app
        const defaultTodo = db.prepare('INSERT INTO Todos (user_id, Task) VALUES (?, ?)')
        const todoResult = defaultTodo.run(result.lastInsertRowid, 'this is your first todo');
        //create a JWT token for the user
        const token = jwt.sign({ id: result.lastInsertRowid, username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(503).json({ error: 'Error creating user' });
    }
})

router.post('/login',  (req, res) => {
    const {username,password} = req.body;
    //check if the user exists in the database
    try{
    const getUser  =db.prepare('SELECT* FROM users WHERE username = ?');
    const user = getUser.get(username);
    if(!user){
        return res.status(404).json({ error: 'Invalid username or password' });
    }
    //compare the password with the hashed password in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    //if the password is invalid, return an error
    if(!isPasswordValid){
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    //successfully logged in, create a JWT token for the user
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ token });
}catch(error){
        console.error(error);
        res.status(503).json({ error: 'Error fetching user' });
    }
})




export default router;
