const express = require('express');
const mongoose = require('mongoose'); 
const SERVER_PORT = process.env.port || 3000;
const empRoutes = require('./routes/empManagement')
const userRoutes = require('./routes/userManagement')

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// MongoDB connection
const DB_CONNECTION_STRING = "mongodb+srv://admin:harin123@cluster0.pujm6.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,  
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Error: ', err)
})

app.use('/api/v1/emp', empRoutes);
app.use('/api/v1/user', userRoutes)

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})