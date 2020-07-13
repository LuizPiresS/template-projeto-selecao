import { ConnectionOptions } from 'typeorm'

const connetionOptions: ConnectionOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'magrathea',
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
