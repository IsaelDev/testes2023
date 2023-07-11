const express = require('express')
const app = express()
app.use(express.json());

const conn = require('./db/index');
conn();

app.listen('3000', ()=>{
    console.log('the server is run!')
})