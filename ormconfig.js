process.env.NODE_ENV !== 'production' && require('dotenv').config();

const {
	NODE_ENV = 'development',
	HOST = 'localhost',
	DB_PORT = '5432',
	DB_TYPE = 'postgres',
	DB_NAME = 'test',
	DB_USERNAME = 'postgres',
	DB_PASS = 'test',
} = process.env;

module.exports = {
	type: DB_TYPE,
	host: HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASS,
	database: DB_NAME,
	synchronize: true,
	logging: false,
	entities:
		NODE_ENV !== 'production'
			? ['src/entity/**/*.ts']
			: ['dist/entity/**/*.js'],
	migrations:
		NODE_ENV !== 'production'
			? ['src/migration/**/*.ts']
			: ['dist/migration/**/*.js'],
	subscribers:
		NODE_ENV !== 'production'
			? ['src/subscriber/**/*.ts']
			: ['dist/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
