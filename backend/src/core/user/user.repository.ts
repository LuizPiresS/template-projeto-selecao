import { UserEntity } from './../../database/entities/User'
import { CreateUserRequest } from './dto/create-user.request'

export interface IUserRepository {
  createAndSave: (data: CreateUserRequest) => Promise<UserEntity>
  findByEmail: (email: string) => Promise<UserEntity>
  findDuplicatedEmail: (email: string) => Promise<boolean>

}
