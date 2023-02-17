const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 10;
const pool = require("../api/db-connection");


// /user/shoppingcart
router.get('/', (req,res) => {
    const id = req.session.user[0].id;

    pool.query('SELECT * FROM Shopping_cart where user_id=?;',
    id, (err,result) => {
        if (err){
            res.send({err: err})
        } 
        if (result){
            res.send(result)
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})
// /user/addorder
router.post('/add', (req,res) => {
    const id = req.session.user[0].id;
    const product = req.body.product;
    console.log(id);
    console.log(product);
    pool.query('SELECT * FROM Product where Title=?;',
    product, (err,result) => {
        if (err){
            res.send({err: err})
        } 
        if (result){
            console.log(result)
            const productid = result[0].id
            pool.query('INSERT INTO Shopping_cart values (?,?)',
            [id,productid], (err,result) => {
            console.log(err);
            })
            res.send()
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})
// /user/shoppingcart/delete
router.post('/delete', (req,res) => {
    const id = req.session.user[0].id;
    const product = req.body.product

    pool.query('SELECT * FROM Product where Title=?;',
    product, (err,result) => {
        if (err){
            res.send({err: err})
        } 
        if (result){
            let productId = result[0].id
            pool.query('DELETE FROM Shopping_cart WHERE user_id=? AND product_id = ?',
            [id,productId], (err,result) => {
            })
            res.send()
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})
// /user/shoppingcart/checkout
router.post('/checkout', (req,res) => {
    const id = req.session.user[0].id;
    const product = req.body.product;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const delivery = req.body.delivery;


    pool.query('SELECT * FROM Product where Title=?;',
    product, (err,result) => {
        if (err){
            res.send({err: err})
        } 
        if (result){
            let productId = result[0].id
            pool.query('INSERT INTO Subscription values (null,?,?,?,?,null,?)',
            [id,startDate, endDate,productId, delivery], (err,result) => {
            })
            res.send()
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})

module.exports = router;