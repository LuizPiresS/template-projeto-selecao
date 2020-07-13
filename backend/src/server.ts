import app from './app'
import dotenv from 'dotenv'
import 'reflect-metadata'
dotenv.config()
// import { configApp } from './config/config'

const port = parseInt(process.env.PORT)

app.listen(port, () => {
  console.log(`App listing on port ${port}`)
})
