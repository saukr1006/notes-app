const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title )

    debugger

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const snote = notes.filter((note) => note.title !== title)
    if (notes.length > snote.length) {
        console.log(chalk.black.bgGreen.inverse('Removed'))
        saveNotes(snote)
    }
    else
        console.log(chalk.black.bgRed('Not found'))

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () =>{
    const notes = loadNotes()
    const f = notes.filter((note)=>{
        console.log(note.title)
    })
}

const readNote = (title) =>{
    const notes = loadNotes()
    const note = notes.find((note)=> note.title===title)
    if(note){
        console.log(chalk.green('Found'))
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
}