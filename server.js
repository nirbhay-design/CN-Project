const express = require('express');

const app = express();
const server = require('http').Server(app)

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true}))

app.get('/',(req,res)=>{
    // res.status(200).send("hello world buddy")
    res.render('room')
})


const Port = process.env.PORT || 3000
app.listen(Port,()=>{
    console.log(`app is listening at ${Port} port`)
})