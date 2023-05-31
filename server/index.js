const express = require("express")
const app = express()
const cors = require('cors')
const User = require('./models/user_model')
const jwt = require('jsonwebtoken')
const error = require('./errorHandling/error')
const dotenv = require("dotenv").config();
const dbConnect = require('./config/config_db')
const port = process.env.PORT;
// const path = require("path")

// mongoose.connect('mongodb+srv://kaniskaab33:kaniskaa@cluster0.ln0cr5w.mongodb.net/user_auth?retryWrites=true&w=majority')
app.use(error)
app.use(cors())
dbConnect()
app.use(express.json())

app.post('/api/auth/init-user', async (req,res)=>
{ 
    console.log(req.body)
    const {email,password} = req.body;
    try{
        const user = await User.create(
            {
                email: email,
                password:password
            }
        )
        res.json({status:'ok'})
    }
    catch(err){
        res.json({status:'error', error:'Duplicate email'})

    }
    
})
// app.post('/api')
app.post('/api/auth', async (req,res)=>
{
    console.log(req.body)
    const{email, password}= req.body
        const user = await User.findOne(
            {
                email: email,
                password:password
            }

        )
        if(user)
        {
            const token = jwt.sign(
                {
                    email: email
                },
                'secret123'
            )
            return res.json({status:'ok', user:true})


        }
        else{
            alert('Email ID already registered!')

            return res.json({status:'error', user:false})
        }})
    
    app.post('/api/auth/forgot-password', async (req,res)=>
    {
        console.log(req.body)
        const{email}= req.body

        const user = await User.findOne(
            {
                email: email
            }

        )
        if(user)
        {
            console.log(user.password)
            return res.json({status:'ok', user:true, password:user.password})


        }
        else{
            console.log('No such user')
            return res.json({status:'found', user:false})
        }})

// app.use(express.static(path.join(__dirname, './server/auth_system/build')))
// app.get('*', function(req,res)
// {
//     res.sendFile(path.join(__dirname,'./server/auth_system/build/index.js'))
// })

app.listen(port,()=>
{
    console.log(`serving running in ${port}`);
})