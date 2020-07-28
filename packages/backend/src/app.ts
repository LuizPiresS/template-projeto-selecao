import express from 'express'
import { createConnection } from 'typeorm'

import { cors } from './adapters/express/middlewares/cors'
import UserRoutes from './adapters/express/users/routes'
import connetionOptions from './config/ormconfig'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors)
  }

  private async routes(): Promise<void> {
    await createConnection(connetionOptions)
    UserRoutes()
  }
}

export default new App().express
