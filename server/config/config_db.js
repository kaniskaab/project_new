const mongoose = require("mongoose");

const dbConnect = async () =>
{
    try {
        const connect = await mongoose.connect('mongodb+srv://kaniskaab33:kaniskaa@cluster0.ln0cr5w.mongodb.net/user_auth?retryWrites=true&w=majority');
        console.log("database connected", connect.connection.name, connect.connection.id);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}

module.exports= dbConnect