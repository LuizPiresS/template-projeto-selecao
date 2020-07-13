import express from 'express'
import { createConnection, Connection } from 'typeorm'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private async database (): Promise<Connection> {
    return await createConnection()
  }

  private routes (): void {
    this.express.get('/', (req, res) => {
      return res.send({
        response: 'Test'
      })
    })
  }
}

export default new App().express
