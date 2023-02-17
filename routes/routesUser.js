const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 10;
const pool = require("../api/db-connection");


router.post('/',(req,res)=> {
    res.clearCookie('userLoggedIn').send()
})

router.get('/details', (req,res) => {
    const id = req.session.user[0].id;
    // console.log(req)

    pool.query('SELECT * FROM User where id=?;',
    id, (err,result) => {
        // console.log(err); 
        if (err){
            res.send({err: err})
        } 
        if (result){
            res.send(result)
        }else {
            res.send({message: 'User does not exist'}); 
        }
    })
})

router.get('/account', (req,res) => {
    if (req.session.user){
        res.send({userLoggedIn: true,
        user:req.session.user})
    }else{
        res.send({userLoggedIn: false})
    }
})
router.get('/orderhistory', (req,res) => {
    const id = req.session.user[0].id;

    pool.query('SELECT * FROM Subscription where user_id=?;',
    id, (err,result) => {
        if (err){
            res.send({err: err})
        } 
        if (result){
            res.send(result)
        }else {
            res.send({message: 'User does not exist'}); 
        }
    })
})
router.post('/register', (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const address = req.body.address;
    const imgSource = req.body.imgSource;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash)=>{

        pool.query('INSERT INTO User values (null,?,?,?,?,?,?)',
        [firstName,lastName,email,imgSource,address,hash], (err,result) => {
            console.log(err);
        })
    })
})
router.post('/change_address',(req,res) => {
    const address = req.body.address
    const id = req.body.id
    console.log(address);
    console.log(id);
    pool.query('UPDATE User SET Address = ? WHERE id=?',
    [address,id], (err,result) => {
        console.log(err);
    })
    res.send()
})
router.post('/change_img',(req,res) => {
    const img = req.body.imgSource
    const id = req.body.id
    console.log(address);
    console.log(id);
    pool.query('UPDATE User SET Profile_pic = ? WHERE id=?',
    [address,id], (err,result) => {
        console.log(err);
    })
    res.send()
})
    
router.get('/login', (req,res) => {
    if (req.session.user){
        res.send({userLoggedIn: true,
        user:req.session.user})
    }else{
        res.send({userLoggedIn: false})
    }
})
router.post('/login', (req,res) => {
    console.log('loggin in')
    const email = req.body.email;
    const password = req.body.password;
    // console.log(req)

    pool.query('SELECT * FROM User where Email=?;',
    email, (err,result) => {
        console.log(result); 
        if (err){
            console.log(err)
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

module.exports = router;