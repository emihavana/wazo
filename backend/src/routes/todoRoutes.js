import express from "express";
import db from "../db.js";
const router = express.Router();

//get all todos
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM Todos WHERE user_id = ?');
    const todos = getTodos.all(req.userid);
    res.status(200).json(todos);
});
//create a new todo
router.post('/', (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = db.prepare('INSERT INTO Todos (user_id, Task) VALUES (?, ?)');
        const result = newTodo.run(req.userid, task);
        res.status(201).json({ id: result.lastInsertRowid});
    } catch (error) {
        console.error(error);
        res.status(503).send('Error creating todo');
    }
});
//update a todo
router.put('/:id', (req, res) => {
    const {completed} = req.body;
    const { id } = req.params;
    const { task } = req.body;
    try {
        const updateTodo = db.prepare('UPDATE Todos SET  Completed = ? WHERE id = ?');
        updateTodo.run( completed, id);
        res.status(200).json({ message: 'Todo completed successfully' });
    } catch (error) {
        console.error(error);
        res.status(503).send('Error updating todo');
    }
});
//delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = db.prepare('DELETE FROM Todos WHERE id = ?');
        const result = deleteTodo.run(id);
        res.status(200).json({ id });
    } catch (error) {
        console.error(error);
        res.status(503).send('Error deleting todo');
    }
});
export default router;