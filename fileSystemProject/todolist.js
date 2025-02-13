const express = require('express')
const bodyParser = require('body-parser');
const fs = require("fs")
const app = express()

app.use(bodyParser.json());



app.get('/todos', (req, res) => {

    fs.readFile('./files/tododata.txt', 'utf-8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.send(data);
        });
  })

app.post('/todos', (req, res) => {
    
    for( i of req.body) {
        const newTodo = {
            id: Math.floor(Math.random() * 10000), // unique random id
            title: i.title,
            description: i.description 
        }
           
        fs.writeFile('./files/tododata.txt', JSON.stringify(newTodo), (err)=>{
            if (err) {
                console.error(err);
              } else {
                // file written successfully
              }
        })
    }
    res.status(201).json({"message" : "Done Done Done!"})
  })

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
      res.status(404).send();
    } else {
      res.json(todo);
    }
  })

app.listen(3000)