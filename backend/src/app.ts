import express from 'express'
import { createConnection } from 'typeorm'

import userRoutes from './adapters/express/users/routes'
import connetionOptions from './config/ormconfig'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private async routes (): Promise<void> {
    await createConnection(connetionOptions)
    userRoutes()
  }
}

export default new App().express
