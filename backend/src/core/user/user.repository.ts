import { CreateUserRequest } from './dto/create-user.request'
import { CreateUserResponse } from './dto/create-user.response'

export interface UserRepository {
  save: (data: CreateUserRequest) => CreateUserResponse
}
