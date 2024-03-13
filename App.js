const express = require('express')
const app = express()
const port = process.env.PORT||3000


//bodyparser
app.use(require('body-parser').urlencoded({extended:true}))
app.use(require('body-parser').json({extended:true}))

//cors
app.use(require('cors')())

//mogran
app.use(require('morgan')('dev'))

//dotenv
require('dotenv').config()

//fileupload
app.use(require('express-fileupload')({useTempFiles:true}))

//Session
app.use(require('express-session')({resave:false,secret:process.env.sessSecret,saveUninitialized:true,cookie:{maxAge:604800000}}))

//ejs
app.set('view engine', 'ejs')
//public
app.use(express.static('public'))

////////////////routes/////////
app.use('/',require('./router/StudentRoutes')) //student route
app.use('/school',require('./router/SchoolRoute')) //student route

app.get('/logout',(req,res)=>{req.session.destroy();res.redirect('/')})

app.use((req,res)=>res.status(404).render('404'))



//mongoose
const mongoose=require('mongoose')
mongoose.set('runValidators',true)
mongoose.set('strictQuery',true)
mongoose.connect(process.env.mongolink,{useNewUrlParser:true,useUnifiedTopology:true,}).then(()=>{
    console.log('db connected');
    app.listen(port,()=>{
        console.log(`http://localhost:${port}`);
    })
}).catch(err=>console.log(err))

