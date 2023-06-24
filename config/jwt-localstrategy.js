const passport =require('passport');
const User = require('../models/User');
const mongoose = require('mongoose');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try{
        let user = await User.findOne({id: jwt_payload.id});
        if(user){
            return done(null, user);
        }else{
            return done(err, false);
        }
    }catch(err){
        return done(err, false);
    }
}));

module.exports = passport;