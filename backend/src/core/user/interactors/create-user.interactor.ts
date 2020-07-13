import { Presenter } from '../../common/presenter'
import { Validator } from '../../common/validator'
import { CreateUserRequest } from '../dto/create-user.request'
import { CreateUserResponse } from '../dto/create-user.response'
import { UserEmailInvalidError } from '../errors'

export class CreateUserInteractor {
  constructor (
    protected readonly validator: Validator,
    protected readonly presenter: Presenter<CreateUserResponse>
  ) {}

  async execute (data: CreateUserRequest): Promise<void> {
    try {
      if (!this.validator.isEmail(data.email)) {
        throw new UserEmailInvalidError('Invalid e-mail')
      }
    } catch (error) {
      await this.presenter.throw(error)
    }
  }
}
