import express from 'express'
import cors from 'cors'
import { router } from '../routes/server.routes.js'

const LISTEN_PORT = process.env.PORT || 80
// Declaración de constante de tipo express
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

// Health Check
app.get('/healthCheck', function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Service Running'
  })
})
// Connection Method
app.get('/connectionMethod', function (req, res) {
  res.status(200).json({
    success: true,
    message: `Connection Method: ${process.env.DBCONN ? 'ENV' : 'Header'}`
  })
})

//Routes
app.use('/',router)
 
app.listen(LISTEN_PORT, () => {
  console.log('Escuchando puerto ', LISTEN_PORT)
})
