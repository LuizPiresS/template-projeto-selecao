import { Presenter } from '../../common/presenter'
import { Validator } from '../../common/validator'
import { CreateUserRequest } from '../dto/create-user.request'
import { CreateUserResponse } from '../dto/create-user.response'
import { UserEmailInvalidError } from '../errors/user-email-invalid.error'
import { CreateUserInteractor } from './create-user.interactor'

const validatorMock = {
  isEmail: jest.fn()
}

const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn()
}

describe('CreateUSer Controller', () => {
  let interactor: CreateUserInteractor

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      // userRepositoryMock as UserRepository,
      validatorMock as Validator,
      presenterMock as Presenter<CreateUserResponse>

    )

    beforeEach(() => {
      validatorMock.isEmail.mockReturnValue(true)
    // userRepositoryMock.findEmail.mockReturnValue(false);
    })
  })
  test('test the email is valid', async () => {
    const mockDataRequest: CreateUserRequest = {
      firstName: 'first_name',
      lastName: 'last_name',
      gitHubUsername: 'github_username',
      email: 'invalid_email',
      password: 'any_password'
    }

    validatorMock.isEmail.mockReturnValue(false)
    await interactor.execute(mockDataRequest)

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserEmailInvalidError)
    )
  })
})
