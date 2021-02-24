const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')
const PORT = 3000

//loads html pages using public folder 
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const dbFile = './db/db.json'

const list = fs.existsSync(dbFile)?JSON.parse(fs.readFileSync(dbFile)):[]

//Calls db.json database file
app.get('/api/notes', function(req, res){
    res.send(list)
})

//Writes new entries into the database file
app.post('/api/notes', function(req, res){
    list.push({id: uuid.v4(), title: req.body.title, text: req.body.text})
    fs.writeFileSync(dbFile, JSON.stringify(list))
    res.redirect('/notes')
})

//Deletes entries from the database file
app.delete('/api/notes/:id', function(req, res){
    saved = list.filter(entry => entry.id === parseInt(req.params.id)).indexOf(req.params.id)
    list.splice(saved, 1)
    fs.writeFileSync(dbFile, JSON.stringify(list))
    res.redirect('/notes')
})

app.listen(PORT, function(){
    console.log(`Serving notes on PORT ${PORT}`)
})