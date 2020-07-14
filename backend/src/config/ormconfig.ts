import { ConnectionOptions } from 'typeorm'

const connetionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    'src/database/entities/**/*.ts',
    'build/database/entities/**/*.js'
  ],
  migrations: [
    'src/database/migration/**/*.ts'
  ],
  subscribers: [
    'src/database/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers'
  }
}

export default connetionOptions
