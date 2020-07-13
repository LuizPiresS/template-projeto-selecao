import app from './app'
import { configApp } from './config/config'

app.listen(configApp.port, () => {
  console.log(`App listing on port ${configApp.port}`)
})
