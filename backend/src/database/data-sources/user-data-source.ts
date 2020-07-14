import { EntityRepository, Repository } from 'typeorm'

import { User } from '../entities/User'

@EntityRepository(User)
export class UserDataSource extends Repository<User> {
  async findByEmail (email: string): Promise<User> {
    return await this.findOne({ email })
  }
}
