const express =require('express');
const connectDB=require('./config/db');
const listEndpoints = require('express-list-endpoints');
const app=express();
connectDB();

//init middlewere

app.use(express.json({extended:false}));
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/post',require('./routes/post'))
const routes = listEndpoints(app);
console.log(routes);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`server started on port ${PORT}`);});

