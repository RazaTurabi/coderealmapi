const db = require('../config/db');

class Form {
  static async create(submission) {
    const { name, type, enquiry, companyName, countryCode, phone } = submission;

    const [result] = await db.execute(
      `INSERT INTO submissions 
       (name, type, enquiry, company_name, country_code, phone_number, submission_date) 
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [name, type, enquiry, companyName || '', countryCode || '', phone || '']
    );

    return result;
  }

  static async setupTable() {

  // Then create fresh table
  await db.execute(`
    CREATE TABLE submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type ENUM('company', 'individual') NOT NULL,
      enquiry TEXT NOT NULL,
      company_name VARCHAR(255) DEFAULT '',
      country_code VARCHAR(10) DEFAULT '',
      phone_number VARCHAR(20) DEFAULT '',
      submission_date DATETIME NOT NULL
    )
  `);
  }
}

module.exports = Form;
