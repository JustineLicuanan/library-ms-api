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
	logging: NODE_ENV !== 'production',
	entities: ['dist/entity/**/*.js'],
	migrations: ['dist/migration/**/*.js'],
	subscribers: ['dist/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'dist/entity',
		migrationsDir: 'dist/migration',
		subscribersDir: 'dist/subscriber',
	},
};
