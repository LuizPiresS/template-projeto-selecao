import { Presenter } from '../../common/presenter'
import { Validator } from '../../common/validator'
import { CreateUserRequest } from '../dto/create-user.request'
import { CreateUserResponse } from '../dto/create-user.response'
import { UserEmailInvalidError } from '../errors'
import { IUserRepository } from '../user.repository'
import { UserDuplicatedEmailError } from './../errors/user-duplicated-email.error'

export class CreateUserInteractor {
  constructor (
    protected readonly validator: Validator,
    protected readonly presenter: Presenter<CreateUserResponse>,
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
