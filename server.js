//API end point
let projectData=[];

const port = 8000 ;


const express = require('express');
const app = express();

//dependencies
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

//initialing the server
app.listen(port,() =>{
    console.log(`server has started successfully`);
})


app.get('/retrieve',(req,res)=>{
    console.log(`server has recieved: get request on /retrieve`);
    res.send(projectData[projectData.length-1]);
})


app.post('/update',(req,res)=>{
    let newData = req.body;
    let newEntry = {
        temp:newData.temp,
        date:newData.date,
        userRes:newData.userRes
    };
    console.log(`server has recieved: Post request on /update data: `);
    projectData.push(newEntry);
})