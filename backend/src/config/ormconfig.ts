import { ConnectionOptions } from 'typeorm'
// import { dbConfig } from './config'
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
    'src/database/entity/**/*.ts',
    'build/database/entity/**/*.js'
  ],
  migrations: [
    'src/database/migration/**/*.ts'
  ],
  subscribers: [
    'src/database/subscriber/**/*.ts'
  ]
}

export default connetionOptions
