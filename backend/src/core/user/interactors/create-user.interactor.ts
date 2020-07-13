import { IPresenter } from '../../common/IPresenter'
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
    protected readonly userRepository: IUserRepository
  ) {}

  async execute (data: CreateUserRequest): Promise<void> {
    try {
      if (!this.validator.isEmail(data.email)) {
        throw new UserEmailInvalidError('Invalid e-mail')
      }

      if (this.userRepository.findByEmail(data.email)) {
        throw new UserDuplicatedEmailError('E-mail duplicated')
      }
    } catch (error) {
      await this.presenter.throw(error)
    }
  }
}
