import app from './app'
import { appConfig } from './config/config'
import 'reflect-metadata'

const port = appConfig.port

app.listen(port, () => {
  console.log(`App listing on port ${port}`)
})
