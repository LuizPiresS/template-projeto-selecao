import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { User } from '../../core/user/user'

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  gitHubUsername: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @DeleteDateColumn()
  deletedAt: string
}
