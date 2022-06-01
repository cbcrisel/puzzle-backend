const {response,request} = require('express');
const Puzzle=require('../models/puzzle');

const  postPuzzle = async(req=request,res=response) => {
    try {
        const {description,difficulty,completed}= req.body
        const image=req.file.path;
        const puzzle=new Puzzle({description,difficulty,image});
        await puzzle.save();
        res.status(200).json({
            message:'Puzzle saved',
            data:puzzle
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Error al crear el puzzle'
        });
    }
}

const getLastPuzzle = async(req=request,res=response) => {
    try {
        const puzzle=await Puzzle.findOne().sort({_id:-1});
        return res.status(200).json({puzzle})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Error al crear el puzzle'
        });
    }
}

module.exports={
    postPuzzle, getLastPuzzle
}