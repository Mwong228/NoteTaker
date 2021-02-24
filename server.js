const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')
const PORT = 3000

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const dbFile = './db/db.json'

const list = fs.existsSync(dbFile)?JSON.parse(fs.readFileSync(dbFile)):[]

app.get('/api/notes', function(req, res){
    res.sendFile(list)
})

app.post('/api/notes', function(req, res){
    list.push({id: uuid(), title: req.body.title, text: req.body.text})
})

app.delete('/api/notes/:id', function(req, res){

})

app.listen(PORT, function(){
    console.log(`Serving notes on PORT ${PORT}`)
})