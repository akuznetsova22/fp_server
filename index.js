const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 10;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key:'userLoggedIn',
    secret:'secretMessage',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    }
}))

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
    bcrypt.hash(password, saltRounds, (err, hash)=>{

        db.query('INSERT INTO User values (null,?,?,?,?,?,?)',
        [firstName,lastName,email,imgSource,address,hash], (err,result) => {
            console.log(err);
        })
    })
})
app.post('/user/change_address',(req,res) => {
    const address = req.body.address
    const id = req.body.id
    console.log(address);
    console.log(id);
    db.query('UPDATE User SET Address = ? WHERE id=?',
    [address,id], (err,result) => {
        console.log(err);
    })
    res.send()
})
app.post('/user/change_img',(req,res) => {
    const img = req.body.imgSource
    const id = req.body.id
    console.log(address);
    console.log(id);
    db.query('UPDATE User SET Profile_pic = ? WHERE id=?',
    [address,id], (err,result) => {
        console.log(err);
    })
    res.send()
})
    
app.get('/user/login', (req,res) => {
    if (req.session.user){
        res.send({userLoggedIn: true,
        user:req.session.user})
    }else{
        res.send({userLoggedIn: false})
    }
})
app.get('/user/account', (req,res) => {
    if (req.session.user){
        res.send({userLoggedIn: true,
        user:req.session.user})
    }else{
        res.send({userLoggedIn: false})
    }
})

app.post('/user',(req,res)=> {
    res.clearCookie('userLoggedIn').send()
})
app.post('/user/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(req)

    db.query('SELECT * FROM User where Email=?;',
    email, (err,result) => {
        // console.log(err); 
        if (err){
            res.send({err: err})
        } 
        if (result.length > 0){
            bcrypt.compare(password, result[0].Password, (error,response)=> {
            if (response){
                req.session.user = result;
                console.log(req.session.user)
                res.send(result)
            } else 
            {res.send({message: 'Wrong email/password combination'});
        }
        })
        }else {
            res.send({message: 'User does not exist'}); 
        }
    })
})
// app.get('/user/login/id', (req,res) => {
//     const email = req.query.email;
//     const password = req.query.password;
//     // console.log(email)

//     db.query('SELECT * FROM User where Email=? AND Password=?',
//     [email,password], (err,result) => {
//         // console.log(err);
   
//     if (err){
//         res.send({err: err})
//     } 
//     if (result.length > 0){
//         res.send(result)
//     }
//     else {
//         res.send({message: 'Wrong email/password combination'});
//     }
//     }
//     )
// } )
// app.get('/user/register/id', (req,res) => {
//     const email = req.query.email;
//     const password = req.query.password;
//     // console.log(email)

//     db.query('SELECT * FROM User where Email=? AND Password=?',
//     [email,password], (err,result) => {
//         // console.log(err);
   
//     if (err){
//         res.send({err: err})
//     } 
//     if (result.length > 0){
//         res.send(result)
//     }
//     else {
//         res.send({message: 'Wrong email/password combination'});
//     }
//     }
//     )
// } )
// app.get('/user/account', (req,res) => {
//     const id = req.query.id;

//     db.query('SELECT * FROM User where id=?',
//     [id], (err,result) => {
//         console.log(err);
   
//     if (err){
//         res.send({err: err})
//     } 
//     if (result.length > 0){
//         res.send(result)
//     }
//     else {
//         res.send({message: 'Wrong email/password combination'});
//     }
//     }
//     )
// } )

// app.post('/user/account', (req,res) => {
//     const id = req.body.id;

//     db.query('SELECT * FROM User where id=?',
//     [id], (err,result) => {
//         console.log(err);
   
//     if (err){
//         res.send({err: err})
//     } 
//     if (result.length > 0){
//         res.send(result)
//     }
    
//     })
// } )




app.listen(3001,() => {
    console.log('running server');
})