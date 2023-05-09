import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { connectDB } from './config/db';
import { schema } from './schema';

const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

// Connect to DB
connectDB();

app.use(cors());

// Route for graphiQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server is running on port ${port}`));
