import { IPresenter } from '../../common/IPresenter'
import { ISecurity } from '../../common/Isecurity'
import { IValidator } from '../../common/IValidator'
import { CreateUserRequest } from '../dto/create-user.request'
import { CreateUserResponse } from '../dto/create-user.response'
import { UserEmailInvalidError } from '../errors'
import { IUserRepository } from '../user.repository'
import { UserDuplicatedEmailError } from './../errors/user-duplicated-email.error'

export class CreateUserInteractor {
  constructor (
    protected readonly validator: IValidator,
    protected readonly presenter: IPresenter<CreateUserResponse>,
    protected readonly userRepository: IUserRepository,
    protected readonly security: ISecurity
  ) {}

  async execute (data: CreateUserRequest): Promise<void> {
    try {
      if (!data.email) {
        throw new UserEmailInvalidError('Invalid email')
      }
      if (!this.validator.isEmail(data.email)) {
        throw new UserEmailInvalidError('Invalid email')
      }

      if (await this.userRepository.findDuplicatedEmail(data.email)) {
        throw new UserDuplicatedEmailError('Duplicated email')
      }

      const encriptedPassword = this.security.encryptPassword(data.password)

      data.password = encriptedPassword
      // Data persistence
      const {
        id,
        firstName,
        gitHubUsername,
        lastName,
        email,
        createdAt
      } = await this.userRepository.createAndSave(data)

      // Presenter success response
      await this.presenter.reply({
        id,
        firstName,
        gitHubUsername,
        lastName,
        email,
        createdAt
      })
    } catch (error) {
      await this.presenter.throw(error)
    }
  }
}
