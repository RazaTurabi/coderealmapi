const db = require('../config/db');

class Form {
  static async create(submission) {
    const { name, type, enquiry, companyName } = submission;
    
    const [result] = await db.execute(
      `INSERT INTO submissions 
       (name, type, enquiry, company_name, submission_date) 
       VALUES (?, ?, ?, ?, NOW())`,
      [name, type, enquiry, companyName || '']
    );
    
    return result;
  }

  static async setupTable() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type ENUM('company', 'individual') NOT NULL,
        enquiry TEXT NOT NULL,
        company_name VARCHAR(255) DEFAULT '',
        submission_date DATETIME NOT NULL
      )
    `);
  }
}

module.exports = Form;