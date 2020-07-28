import dotenv from 'dotenv'

import app from './app'
import 'reflect-metadata'

dotenv.config()
const port = 3003

app.listen(port, () => {
  console.log(`App listing on port ${port}`)
})
