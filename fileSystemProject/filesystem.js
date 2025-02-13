const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


const port = 3000

const dirpath = "./files/"

app.get('/files', (req , res) => {

  fs.readdir(path.join(__dirname, dirpath), (err, files)=>{
    if (err) {
        console.error('Error reading directory:', err);
        res.status(411).json({
            message : "Path not found"
        })
        return
      }

      // Log the list of file names
      console.log('Files in the directory:');
      res.send(files)

  })
})

app.get('/files/:filename', function (req, res) {
    const filepath = `${dirpath}` + req.params.filename

    fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        return res.status(404).send('File not found');
    }
    res.send(data);
    });
});

app.listen(port)