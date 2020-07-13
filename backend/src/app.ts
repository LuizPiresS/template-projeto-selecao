import express from 'express'
import { createConnection, Connection, getCustomRepository } from 'typeorm'

import connetionOptions from './config/ormconfig'
import { UserRepository } from './database/repositories/user-repository'

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

  private async database (): Promise<Connection> {
    return await createConnection(connetionOptions)
  }

  private async routes (): Promise<void> {
    this.express.post('/', async (req, res) => {
      const userRepository = getCustomRepository(UserRepository)
      const user = userRepository.create()
      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.email = req.body.email
      user.password = req.body.password
      const result = await userRepository.save(user)
      return res.send(result)
    })
  }
}

export default new App().express
