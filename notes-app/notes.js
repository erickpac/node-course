const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...'
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(item => item.title === title)

    if (!duplicateNote) {
        const object = {
            title: title,
            body: body
        };

        notes.push(object);
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataString);
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(item => item.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep);
    } else { 
        console.log(chalk.red.inverse('Note not found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes...'));
    notes.map( item => {
        console.log(item.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(item => item.title === title)

    if (note) {
        console.log(chalk.inverse('Note title: ', note.title));
        console.log(chalk.inverse('Note body: ', note.body));
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (error) {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
};