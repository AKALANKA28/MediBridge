const mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    if (this.connection) {
      return this.connection; // Return the existing connection if already established.
    }

    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        this.connection = mongoose.connection; // Store the connection instance
        console.log('MongoDB connected ✌️');
      })
      .catch(err => {
        console.error('Database connection error:', err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database(); // Create a new instance if it doesn't exist.
    }
    return Database.instance;
  }
}

module.exports = Database;
