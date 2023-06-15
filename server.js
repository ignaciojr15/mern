const express =require('express');
const connectDB=require('./config/db');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');

const app=express();
const cors = require('cors');
 connectDB();

//init middlewere
// Configurar el middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({extended:false}));

app.use(cors());
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/auth',require('./routes/auth'));
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`server started on port ${PORT}`);});

