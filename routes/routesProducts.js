const express = require('express');
const router = express.Router();
const pool = require("../api/db-connection");

router.get('/', (req,res) => {
    pool.query('SELECT * FROM Product;',
     (err,result) => {
        // console.log(err); 
        if (err){
            res.send({err: err})
        } 
        if (result){
            res.send({products:result})
        }else {
            res.send({message: 'Product does not exist'}); 
        }
    })
})

module.exports = router;