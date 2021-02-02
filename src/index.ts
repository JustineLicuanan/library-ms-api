import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import { createConnection, getConnectionOptions } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';

import { AuthResolver } from './resolvers/AuthResolver';
import { BookItemResolver } from './resolvers/BookItemResolver';
import { Session } from './entity/Session';

(async () => {
	const {
		NODE_ENV = 'development',
		PORT = '4000',
		SESSION_SECRET = 'aslkdfjoiq12312',
		CLIENT_URI = 'http://localhost:3000',
	} = process.env;
	const app = express();

	const options = await getConnectionOptions(NODE_ENV);
	const connection = await createConnection({
		...options,
		name: 'default',
	});
	const sessionRepo = connection.getRepository(Session);

	app.use(
		session({
			store: new TypeormStore({
				cleanupLimit: 2,
				ttl: 86400,
			}).connect(sessionRepo),
			name: 'qid',
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
				sameSite: 'none',
			},
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [AuthResolver, BookItemResolver],
			validate: true,
		}),
		context: ({ req, res }) => ({ req, res }),
		...(NODE_ENV !== 'production' && {
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
		}),
	});

	const corsOptions = {
		origin: CLIENT_URI,
		credentials: true,
	};

	apolloServer.applyMiddleware({ app, cors: corsOptions });
	app.listen(PORT, () =>
		console.log(`Server started at http://localhost:${PORT}/graphql`)
	);
})();
