const express = require('express');
const router = express.Router();
const Shipping = require('../controller/index');

router.post('/',async (req,res)=>{
    const shipping = new Shipping(req.body);
    console.log(req.body);
    const result = await shipping.save();
    if(result===400){
        res.status(400).send({error: 'La distancia de entrega no puede ser mayor a 20 Km'});
    }else{
        res.send(result);
    }
});

router.put('/:id',async (req,res)=>{
    const ID = req.params.id;
    const body = req.body;
    const shipping = new Shipping({id:ID,...body});
    res.json(await shipping.updateItem());
})

router.get('/:id',async (req,res)=>{
    const ID = req.params.id;
    const shipping = new Shipping({id:ID});
    res.json(await shipping.get());
})

router.get('/',async (req,res)=>{
    const shipping = new Shipping();
    res.json(await shipping.getAll());
})

module.exports = router;