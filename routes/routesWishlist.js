const express = require('express');
const router = express.Router();
const pool = require("../api/db-connection");

// /user/wishlist
router.get('/', (req,res) => {
    const id = req.session.user[0].id;

    pool.query('SELECT * FROM Wishlist where user_id=?;',
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
// /user/addwishlist
router.post('/add', (req,res) => {
    const id = req.session.user[0].id;
    const product = req.body.product;

    pool.query('SELECT * FROM Product where Title=?;',
    product, (err,result) => {
        // console.log(err); 
        if (err){
            res.send({err: err})
        } 
        if (result){
            const productid = result[0].id
            pool.query('INSERT INTO Wishlist values (?,?)',
            [id,productid], (err,result) => {
            console.log(err);
            })
            res.send()
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})
// /user/wishlist/delete
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
            pool.query('DELETE FROM Wishlist WHERE user_id=? AND product_id = ?',
            [id,productId], (err,result) => {
            })
            res.send()
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})
// /user/wishlist/addtocart
router.post('/addtocart', (req,res) => {
    const id = req.session.user[0].id;
    const product = req.body.product
    pool.query('SELECT * FROM Product where Title=?;',
    product, (err,result) => {
        if (err){
            res.send({err: err})
        } 
        if (result){
            let productId = result[0].id
            pool.query('INSERT INTO Shopping_cart values (?,?)',
            [id,productId], (err,result) => {
            })
            res.send()
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})
module.exports = router;