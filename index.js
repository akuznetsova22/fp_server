const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password: 'Tokio135',
    database: 'FinalProject'
});

app.post('/user/register', (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const address = req.body.address;
    const imgSource = req.body.imgSource;
    const password = req.body.password;

    db.query('INSERT INTO User values (null,?,?,?,?,?,?)',
    [firstName,lastName,email,imgSource,address,password], (err,result) => {
        console.log(err);
    } )
})
app.post('/user/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM User where Email=? AND Password=?',
    [email,password], (err,result) => {
        console.log(err);
   
    if (err){
        res.send({err: err})
    } 
    if (result.length > 0){
        res.send(result)
    }
    else {
        res.send({message: 'Wrong email/password combination'});
    }
    }
    )
} )


app.listen(3001,() => {
    console.log('running server');
})