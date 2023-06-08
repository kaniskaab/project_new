const express = require("express")
const app = express()
const cors = require('cors')
const User = require('./models/user_model')
const Prescription = require('./models/prescription')
const jwt = require('jsonwebtoken')
const error = require('./errorHandling/error')
const dotenv = require("dotenv").config();
const dbConnect = require('./config/config_db')
const port = process.env.PORT;
const Pool = require('./database') 
// const path = require("path")

// mongoose.connect('mongodb+srv://kaniskaab33:kaniskaa@cluster0.ln0cr5w.mongodb.net/user_auth?retryWrites=true&w=majority')
app.use(error)
app.use(cors())
dbConnect()
app.use(express.json())

app.post('/api/prescription/post', async(req,res)=>
{
    console.log(req.body);
    const {id, prescription}=req.body;
    try{
        const pres= await Prescription.create(
            {
                id:id,
                prescription:prescription
            }
        )
        res.json({prescription: pres.prescription})
    }
    catch(err)
    {
        res.json({status:'error'})
    }

})

app.post('/api/prescription/get/:id', async(req,res)=>
{
    // console.log(req.params.id)
    
    const id = req.params.id
    const pres = await Prescription.findOne(
        {id:id}
    )
    if(pres)
    {
        console.log(pres)
        return res.json(pres)
        // 
    }
    else{
        console.log('error')
        return res.json({status:"error"})
    }
})

app.post('/api/auth/init-user', async(req,res)=>
{ 
    console.log(req.body)
    

    //new info
    // const username = req.body["username"]
    // const password = req.body["password"]
    // console.log(username,password)
    // const insertInTbl = `INSERT INTO accounts (username, password) VALUES ('${username}','${password}') `;
    // Pool.query(insertInTbl).then((response)=>{
    //     console.log("data saved");
    //     console.log(response);

    // })
    // .catch((err)=>
    // {
    //     console.log("error");
    // })

    // console.log(req.body);
    // res.send("response received: " + req.body)
    //postgres ends


    const {email,password,type} = req.body;
    try{
        const user = await User.create(
            {
                email: email,
                password:password,
                type:type
            }
        )
        res.json({id: user.id})
    }
    catch(err){
        res.json({status:'error', error:'Duplicate email'})

    }
    
})
// app.post('/api')
app.post('/api/auth', async (req,res)=>
{
    // console.log("the data is" , req.body)
    console.log(req.body)
    

    //new info
    // const username = req.body["username"]
    // const password = req.body["password"]
    // console.log(username,password)
    // const searchInTbl = `SELECT * FROM accounts WHERE username='${username}'`;
    // Pool.query(searchInTbl).then((response)=>{
    //     console.log("data received");
    //     console.log(response)
    //     if(response.rows[0].password==password)
    //     {
    //         res.send('login successful')
    //     }
    //     else{
    //         res.send()
    //     }
    //     console.log('Check credentials');

    // })
    // .catch((err)=>
    // {
    //     console.log("error");
    // })

    // console.log(req.body);

    //postgres ends
    // res.send("response received: " + req.body)

    // save it
    const{email, password,type}= req.body
        const user = await User.findOne(
            {
                email: email,
                password:password,
                type:type
            }

        )
        if(user)
        {
            // const token = jwt.sign(
            //     {
            //         email: email
            //     },
            //     'secret123'
            // )
            console.log(user.id)
            return res.json({user})


        }
        else{
            // alert('Email ID not registered!')
            console.log("error!")
            return res.json({status:'error', user:false})
        }
}
    )
        //till here good
    
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