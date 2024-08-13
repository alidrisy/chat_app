import express from 'express'
import authRouts from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'

import path from 'path'

dotenv.config()



const PORT = process.env.PORT || 3000;
const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouts)
app.use('/api/messages', messageRoutes)

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    }
    )
}

server.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000')
});
