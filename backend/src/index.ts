import express from 'express'
import authRouts from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'

const app = express()

app.use('/api/auth', authRouts)
app.use('/api/messages', messageRoutes)

app.get('/', (_req, res) => {
    res.send('Hello World')
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});
