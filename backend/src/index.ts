import express from 'express'
import authRouts from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouts)
app.use('/api/messages', messageRoutes)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});
