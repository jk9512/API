const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getUser = (req, res) => {
    res.send("Hello User");
    console.log('Done');
}


exports.insert = (req, res) => {
    // console.log(req.body);
    const {name, email, password} = req.body;

    User.create({
        name, email, password
    }).then((data) => {
        console.log('data insert successfully');
        return res.json({"data" : data})
    }).catch((err) => {
        console.log('err', err);
    })

}

exports.login = async (req,res) =>{

    try{
        let users = await User.findOne({email : req.body.email})
        if(!users || users.password != req.body.password){
            return res.json({"err" : "err"});
        }
        const token = jwt.sign(users.toJSON(), 'secret', {expiresIn : 1000*60*60})
        return res.status(200).json({"token" : token})
    }catch(err){
        console.log(err);
        return false;
    }

    //  User.findOne({email : req.body.email},(err,users)=>{
    //     if(err) throw err;
    //     if(!users || users.password != req.body.password){
    //         return res.json({"err" : "err"});
    //     }
    //     const token = jwt.sign(users.toJson(), 'secret', {expiresIn : 1000*60*60})
    //     return res.status(200).json({"token" : token})
    // });
}

exports.viewdata = (req,res) => {
    User.find({}).then((data)=>{
        return res.json({"status":"1","messege" : data});
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

exports.deleteData = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log("data delete");
            return res.send('Data delete')
        }).catch((err) => {
            console.log(err);
            return false
        })
}

exports.updateData = (req, res) => {
    const {name, email} = req.body;

    User.findByIdAndUpdate(req.params.id , {
        name, email
    })
        .then((data) => {
            console.log('user update');
            return res.send(data)
        }).catch((err) => {
            console.log('update++',err);
            return false;
        })
}