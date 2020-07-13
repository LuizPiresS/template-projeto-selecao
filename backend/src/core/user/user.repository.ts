import { CreateUserRequest } from './dto/create-user.request'
import { CreateUserResponse } from './dto/create-user.response'

export interface IUserRepository {
  save: (data: CreateUserRequest) => CreateUserResponse
  findByEmail: (email: string) => boolean

}
