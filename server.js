const express = require('express');
const app = express();
const PORT = 6500;
const mongoose = require('mongoose');
const db = require('./config/db')
const users = require('./routes/userRouter');
const JwtStrategy = require('./config/jwt-localstrategy')

db.mongoose.connect(db.url).then(() => {
    console.log('Db Connect');
}).catch((err) => {
    console.log('db err', err);
})

app.use(express.urlencoded());
app.use(express.json());
app.use('/', users)


app.get('/',(req, res) => {
    console.log('done');
});

app.listen(PORT, () => {
    console.log(`server run on : ${PORT}`);
});