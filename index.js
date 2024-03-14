const express = require('express');
const connectoMDB = require('./connect');
const app = express();
const PORT = 8001;
const URL  = require('./models/url');
const urlroute = require('./routes/url');
const { mongoose } = require('mongoose');


connectoMDB.connectDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('Database Connected1'))
    .catch(err => console.error('Error connecting to database:', err));


// const connectDB = ()=>{
//     mongoose.connect('mongodb://127.0.0.1:27017/short-url').then(()=>{
//         console.log("Connected to MongoDB");
//     }).catch(err=>console.log(err))
// }
// connectDB();


app.use(express.json());
app.use('/url',urlroute);

app.get('/:shortId', async (req,res) =>{

    const shortId = req.params.shortId;
 const entry =    await URL.findOneAndUpdate({
        shortId 
      }, {
        $push : {
            visitHistory :{
                timestamp : Date.now()
            },
        }
      });

      res.redirect(entry.redirectURL);
})
app.listen(PORT,()=> console.log( `Server is running on port :${PORT}`))

