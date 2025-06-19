const db = require('../config/db');

class Enquiry {
  static async create({ email, date }) {
    const [result] = await db.execute(
      `INSERT INTO enquiry (email, date) VALUES (?, ?)`,
      [email, date]
    );
    return result;
  }

  static async setupTable() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS enquiry (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      )
    `);
  }
}

module.exports = Enquiry;
