import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';

import bookRoutes from './routes/bookRoutes';

// Inits
process.env.NODE_ENV !== 'production' && dotenv.config();
const { PORT = '3002' } = process.env;
const app = express();

// Connect to database
createConnection()
	.then(() => {
		console.log('Connected to database successfully');

		// Start the server
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
	})
	.catch((err) => console.error(err));

// Middlewares
app.use(express.json());

// Routes
app.use('/books', bookRoutes);
