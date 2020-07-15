import { Response } from 'express'

import { IPresenter } from '../../../core/common/IPresenter'
import { CreateUserResponse } from '../../../core/user/dto/create-user.response'
import { UserDuplicatedEmailError } from '../../../core/user/errors/user-duplicated-email.error'
import { UserEmailInvalidError } from '../../../core/user/errors/user-email-invalid.error'
import { isInstanceOf } from '../../../utils/instanceof'

export class CreateUserJSONPresenter implements IPresenter<CreateUserResponse> {
  constructor (private readonly res: Response) {}

  async reply (data: CreateUserResponse): Promise<void> {
    const responseJSON = { email: data.email }

    // send data
    this.res.status(201).send(responseJSON)
  }

  async throw (error: Error): Promise<void> {
    if (
      isInstanceOf(error, [
        UserEmailInvalidError,
        UserDuplicatedEmailError
      ])

    ) {
      // format error
      const responseJSON = {
        statusCode: 400,
        error: { message: error.message }
      }

      // send data
      this.res.status(400).send(responseJSON)
    }

    // format exception
    const responseJSON = {
      statusCode: 500,
      error: { message: 'Internal server error', details: error.stack }
    }

    // send exception
    this.res.status(500).send(responseJSON)
  }
}
