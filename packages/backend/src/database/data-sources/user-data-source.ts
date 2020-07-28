import { getRepository, EntityRepository, Repository } from 'typeorm'

import { CreateUserRequest } from '../../core/user/dto/create-user.request'
import { IUserRepository } from './../../core/user/user.repository'
import { UserEntity } from './../entities/User'

@EntityRepository(UserEntity)
export class UserDataSource extends Repository<UserEntity> implements IUserRepository {
  private readonly repository = getRepository(UserEntity)

  async createAndSave (data: CreateUserRequest): Promise<UserEntity> {
    return await this.repository.save(data)
  }

  async findByEmail (email: string): Promise<UserEntity> {
    return await this.repository.findOne({ email: email })
  }

  async findDuplicatedEmail (email: string): Promise<boolean> {
    return !!(await this.repository.findOne({ email: email }))
  }
}
