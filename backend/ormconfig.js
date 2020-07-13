require('dotenv').config()

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    'src/database/entity/**/*.ts',
    'src/database/entity/**/*.js'
  ],
  migrations: [
    'src/database/migration/**/*.ts'
  ],
  subscribers: [
    'src/database/subscriber/**/*.ts'
  ]
}
