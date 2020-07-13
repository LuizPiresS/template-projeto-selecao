/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IPresenter } from '../../common/IPresenter'
import { IValidator } from '../../common/IValidator'
import { CreateUserRequest } from '../dto/create-user.request'
import { CreateUserResponse } from '../dto/create-user.response'
import { UserDuplicatedEmailError } from '../errors/user-duplicated-email.error'
import { UserEmailInvalidError } from '../errors/user-email-invalid.error'
import { User } from '../user'
import { IUserRepository } from './../user.repository'
import { CreateUserInteractor } from './create-user.interactor'

const validatorMock = {
  isEmail: jest.fn()
}

const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn()
}

const userRepositoryMock = {
  save: jest.fn(),
  findByEmail: jest.fn()

}

describe('CreateUSer Controller', () => {
  let interactor: CreateUserInteractor

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      validatorMock as IValidator,
      presenterMock as IPresenter<CreateUserResponse>,
      userRepositoryMock as IUserRepository

    )

    beforeEach(() => {
      validatorMock.isEmail.mockReturnValue(true)
      userRepositoryMock.findByEmail.mockReturnValue(false)
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

  test('test duplicated email', async () => {
    userRepositoryMock.save.mockImplementation(
      (data: CreateUserRequest): CreateUserResponse => {
        return {
          ...data,
          id: 'uuid',
          firstName: 'first_name',
          lastName: 'last_name',
          email: 'any_mail@mail.com',
          createdAt: Date.now()
        } as User
      }
    )

    userRepositoryMock.findByEmail.mockReturnValue(true)
    await interactor.execute({
      firstName: 'first_name',
      lastName: 'last_name',
      gitHubUsername: 'github_username',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserDuplicatedEmailError)
    )
  })
})
