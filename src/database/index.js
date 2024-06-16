import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User'
import Product from '../app/models/Products'
import Category from '../app/models/Category'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:jMUUoYdRZiDwOIdWScJDhSIUBbekKNQN@roundhouse.proxy.rlwy.net:13336/railway',
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:bZJZSwviYeKKIwlkUEmSobTNgdhPlPir@monorail.proxy.rlwy.net:11176',
    )
  }
}

export default new Database()
