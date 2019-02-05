const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newsDB', { useNewUrlParser: true });

let Schema = mongoose.Schema;

const newsSchema = new mongoose.Schema({
    id: Number,
    title:  String,
    author: String,
    text:   String,
    date:  Date
});

const userSchema = new Schema({
    userName: String,
    login: String,
    password: String
});

userSchema.methods.verifyPassword = function verifyPassword(password, userPassword) {
    return password === userPassword;
};

const User = mongoose.model('User', userSchema)
const News = mongoose.model('News', newsSchema);

module.exports = { News, User };