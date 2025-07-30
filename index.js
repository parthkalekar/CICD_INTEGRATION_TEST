const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = []

app.get('/users', (req,res) => {
    res.json(users);
})

app.post("/users", (req,res) => {
    const newName = req.body.name;
    if(!newName) return res.status(400).json({error:"Missing name field !"})
    const newUser = {id: users.length + 1, name: newName};
    users.push(newUser);
    res.status(201).json(newUser);
})

app.get("/users/:id", (req,res) => {
    console.log(typeof req.params.id);
    const user = users.find(user => user.id === Number(req.params.id));
    if(!user) return res.status(404).json({message:"User not found !"})
    res.json(user);
})

app.listen(port, () => console.log(`Server running on port ${port}!`));



