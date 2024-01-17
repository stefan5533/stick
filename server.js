if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'D:\facultate\web2\.env'});
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')


app.set('view engine','ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


var mongoose = require('mongoose')

const { MongoClient } = require("mongodb");
//  uri string with connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.listen(process.env.PORT || 3000)

