const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const dbFile = './db/db,json'



app.listen(PORT, function(){
    console.log(`Serving notes on PORT ${PORT}`)
})