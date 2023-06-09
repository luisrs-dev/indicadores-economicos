import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from './src/database.js'
import path from 'path'
import {fileURLToPath} from 'url'
import indicatorRouter from './src/routes/indicators-routes.js'
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/api/indicators', indicatorRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))