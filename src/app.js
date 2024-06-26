import express from 'express'
import routes from './routes'
import './database'
import { resolve } from 'path'
import cors from 'cors'

const corsOptions = {
  origin: 'https://code-club-burger-interface.vercel.app',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}

class App {
  constructor() {
    this.app = express()

    // Configure CORS
    this.app.use(cors(corsOptions))

    this.app.options('*', cors(corsOptions))

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )

    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
