import app from '../../../app'
import { CreateUserRequest } from '../../../core/user/dto/create-user.request'
import { CreateUserInteractor } from '../../../core/user/interactors/create-user.interactor'
import { UserDataSource } from '../../../database/data-sources/user-data-source'
import { SecurityAdapter } from '../../security/security.adapter'
import { ValidatorAdapter } from '../../validator/validator.adapter'
import { CreateUserJSONPresenter } from './create-user-json-adapter'

export function UserRoutes () {
  // const userRoutes =
  const repository = new UserDataSource()
  const validator = new ValidatorAdapter()
  const security = new SecurityAdapter()

  app.get('/users', (req, res) => {
    res.send('teste')
  })

  app.post('/users', async (req, res) => {
    const presenter = new CreateUserJSONPresenter(res)
    const interactor = new CreateUserInteractor(validator, presenter, repository, security)

    // create a request DTO
    const { firstName, lastName, gitHubUsername, email, password } = req.body
    const data: CreateUserRequest = {
      firstName,
      lastName,
      gitHubUsername,
      email,
      password
    }

    // execute interactor and presenter
    await interactor.execute(data)
  })
}

export default UserRoutes
