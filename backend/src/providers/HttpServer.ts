import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'
import { readFileSync } from 'fs'
import path from 'path'
import { Context } from '../types/Apollo'
import { registerDataLoaders } from './DataLoaders'
import { registerGraphQLResolvers } from './GraphQLResolvers'

const typeDefs = readFileSync(path.join(__dirname, '..', '..', 'schema.graphql'), 'utf-8')

export async function createHttpServer(): Promise<Express> {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers: registerGraphQLResolvers(),
    formatError: error => {
      console.error('Server error:', error)
      return {
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      }
    },
  })

  await server.start()
  const app = express()

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
    next()
  })

  // CORS configuration for Docker setup
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://frontend:3000',
        'http://teebay-frontend:3000'
      ],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
    })
  )

  app.use(bodyParser.json())

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => ({
        req,
        loaders: registerDataLoaders(),
      }),
    })
  )

  return app
}