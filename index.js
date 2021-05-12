const express=require("express")
const app = express()
const authRoutes=require("./routes/authRoutes")
const fundraiserRoutes=require("./routes/fundraiserRoutes")
const PORT=process.env.PORT || 5000;
const {errorHandler}=require("./middleware/error")
const connectDB=require("./config/db")
const dotenv=require("dotenv");
const morgan = require("morgan");

dotenv.config({path:'./config/config.env'})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDB()
app.use(morgan('dev'))

app.use("/api/v1/user/auth",authRoutes);
app.use("/api/v1/fundraisers",fundraiserRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>This is the backend for silverline</h1>")
})

app.use(errorHandler)

const server=app.listen(PORT, function(){
    console.log(`Example app listening at http://localhost:${PORT}`)
})

//Promise Rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(err)
    server.close(()=>process.exit(1))    
})