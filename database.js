const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = new mongoose.createConnection(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
connection.on('connected', () => console.log('connected to MongoDB'));

module.exports = connection;