const express = require('express');
const { notes } = require('./db/db.json');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});


app.post('/api/notes', (req, res) => {
  let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json'));
    let noteLength = (noteList.length).toString();
    newNote.id = noteLength;
    noteList.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
})

app.delete("/api/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync('./db/db.json'));
  let noteId = (req.params.id).toString();
 
  noteList = noteList.filter(selected =>{
      return selected.id != noteId;
  })
  
  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
   
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });