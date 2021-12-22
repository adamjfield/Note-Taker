const util = require('util');
const fs = require('fs');
// variable to create unique id for each note
const { v4: uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  // read notes currently in the database
  read() {
    return readFileAsync('db/db.json', 'utf-8');
  }
  // write new note to the database
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
  // get notes from database and parse them
  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  // adds a new note to the array
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("note 'title' and 'text' cannot be blank!");
    }
    const newNote = { title, text, id: uuidv4() };
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  } 
  // removes a note from the array
  removeNote(id) {
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== id))
      .then(filterNotes => this.write(filterNotes));
  }
}

module.exports = new Store();
