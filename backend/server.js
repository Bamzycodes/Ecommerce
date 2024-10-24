import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose'
import cors from'cors'
import userRouter from './routes/userRouter.js'
import cookieParser from'cookie-parser'
import productRouter from './routes/productRouter.js'
import orderRouter from './routes/orderRoutes.js';
import path from 'path'

dotenv.config()


const __dirname = path.resolve();


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())



app.use('/api/order', orderRouter)
app.use('/api/user', userRouter)
app.use("/api/product", productRouter)


app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

// connect to mongoDB
 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });




const PORT = process.env.PORT || 8080
app.listen(PORT, () =>{
    console.log('server is running on port', PORT)
})