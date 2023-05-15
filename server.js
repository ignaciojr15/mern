const express =require('express');
const connectDB=require('./config/db');
const app=express();
connectDB();
app.use('api/users',require('./routes/users'));
app.use('api/auth',require('./routes/auth'));
app.use('api/profile',require('./routes/profile'));
app.use('api/users',require('./routes/users'));
app.use('api/auth',require('./routes/auth'));
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`server started on port ${PORT}`);});

