import express from 'express'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private database (): void {}

  private routes (): void {
    this.express.get('/', (req, res) => {
      return res.send({
        response: 'Test'
      })
    })
  }
}

export default new App().express
