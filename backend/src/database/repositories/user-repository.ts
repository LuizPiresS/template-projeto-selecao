import { EntityRepository, Repository } from 'typeorm'

import { User } from '../entities/User'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByName (firstName: string, lastName: string): Promise<User> {
    return await this.findOne({ firstName, lastName })
  }
}
