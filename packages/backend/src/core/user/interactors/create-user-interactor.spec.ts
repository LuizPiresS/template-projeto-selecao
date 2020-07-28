import { IPresenter } from '../../common/IPresenter'
import { IValidator } from '../../common/IValidator'
import { CreateUserRequest } from '../dto/create-user.request'
import { CreateUserResponse } from '../dto/create-user.response'
import { UserDuplicatedEmailError } from '../errors/user-duplicated-email.error'
import { UserEmailInvalidError } from '../errors/user-email-invalid.error'
import { User } from '../user'
import { ISecurity } from './../../common/Isecurity'
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
  createAndSave: jest.fn(),
  findByEmail: jest.fn(),
  findDuplicatedEmail: jest.fn()
}

const securityMock = {
  encryptPassword: jest.fn(),
  validateToken: jest.fn(),
  encodeToken: jest.fn(),
  decodeToken: jest.fn()
}

describe('CreateUSer Controller', () => {
  let interactor: CreateUserInteractor

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      // userRepositoryMock as UserRepository,
      validatorMock as IValidator,
      presenterMock as IPresenter<CreateUserResponse>,
      userRepositoryMock as IUserRepository,
      securityMock as ISecurity
    )

    beforeEach(() => {
      validatorMock.isEmail.mockReturnValue(true)
      userRepositoryMock.findDuplicatedEmail.mockReturnValue(false)
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
    userRepositoryMock.findDuplicatedEmail.mockReturnValue(true)
    await interactor.execute({
      firstName: 'first_name',
      lastName: 'last_name',
      gitHubUsername: 'github_username',
      email: 'duplicated_emaill@mail.com',
      password: 'any_password'
    })

    expect(presenterMock.throw).toBeCalledWith(
      expect.any(UserDuplicatedEmailError)
    )
  })

  test('Add user', async () => {
    const time = Date.now()
    userRepositoryMock.createAndSave.mockImplementation(
      (data: CreateUserRequest): User => {
        return {
          ...data,
          id: 'uuid',
          firstName: 'first_name',
          lastName: 'last_name',
          gitHubUsername: 'github_username',
          email: 'valid_emaill@mail.com',
          password: 'any_password',
          createdAt: time
        } as User
      }
    )

    await interactor.execute({
      firstName: 'first_name',
      lastName: 'last_name',
      gitHubUsername: 'github_username',
      email: 'valid_emaill@mail.com',
      password: 'any_password'
    })

    expect(presenterMock.throw).not.toBeCalled()
    expect(presenterMock.reply).toHaveBeenCalledWith({
      id: 'uuid',
      firstName: 'first_name',
      lastName: 'last_name',
      gitHubUsername: 'github_username',
      email: 'valid_emaill@mail.com',
      createdAt: time
    })
  })
})
